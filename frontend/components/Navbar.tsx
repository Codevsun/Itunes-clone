'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await fetch(`http://localhost:3000/search/itunes?term=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        // Handle the search results here
        console.log(data);
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  };

  return (
    <nav className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-[#18192a]">
      {/* Back/Forward */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-1">
          <button className="p-1.5 rounded-full hover:bg-[#23243a] text-gray-400">
              <Image src="/assets/right.svg" alt="Back" width={15} height={15} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-[#23243a] text-gray-400">
              <Image src="/assets/left.svg" alt="Forward" width={15} height={15} />
          </button>
        </div>
        <div className="sm:hidden flex items-center">
          <Image src="/assets/logo.svg" alt="Logo" width={30} height={30} />
        </div>
      </div>
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 flex justify-center min-w-0 px-1 sm:px-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search through over 70 million podcasts and episodes..."
          className="w-full max-auto bg-[#18192a] border border-[#50515d] rounded-lg text-center px-3 sm:px-5 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#23243a] text-sm"
        />
      </form>
      {/* Auth Buttons */}
      <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
        <button className="bg-[#3b5b7c] text-white px-3 py-2 rounded-lg font-medium hover:bg-[#4a6a8c] text-sm">Log in</button>
        <button className="bg-[#3b5b7c] text-white px-3 py-2 rounded-lg font-medium hover:bg-[#4a6a8c] text-sm">Sign up</button>
      </div>
      <div className="relative flex items-center flex-shrink-0" ref={dropdownRef}>
        <button 
          className="p-1.5 rounded-full hover:bg-[#23243a] text-gray-400"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image src="/assets/more.svg" alt="More" width={22} height={22} />
        </button>
        {/* Compact Dropdown with Tip */}
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-gradient-to-b from-[#6a4b86] to-[#2a3a6a] rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="py-1">
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                Settings
              </button>
              <div className="relative my-2">
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                About Podbay
              </button>
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                Whats New 
              </button>
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                Podcaster FAQ
              </button>
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                Privacy
              </button>
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                Terms
              </button>
              <div className="relative my-2">
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </div>              
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                Contact & Feedback
              </button>
              <button className="w-full text-left px-3 py-2 text-white hover:bg-black/20 transition-colors text-sm">
                Clear Data...
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 