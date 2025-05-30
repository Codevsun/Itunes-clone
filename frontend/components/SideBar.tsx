'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SideBar() {
    const router = useRouter();
    return (
      <div className="hidden md:flex w-64 bg-[#141524] p-4 flex-col border-r border-gray-700">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <Image src="/assets/logo.svg" alt="Logo" width={52} height={52} className="w-12 h-12" />
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <button className="w-full justify-start text-white hover:bg-gray-700 flex items-center p-2 rounded" onClick={() => router.push('/')}>
          <Image src="/assets/home.png" alt="Home" width={16} height={16} className="w-4 h-4 mr-3" />

          Home
        </button>
        <button className="w-full justify-start text-white hover:bg-gray-700 flex items-center p-2 rounded">
          <Image src="/assets/discover.svg" alt="Discover" width={16} height={16} className="w-4 h-4 mr-3" />
          Discover
        </button>
      </nav>

      {/* Your Stuff Section */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Your Stuff</h3>
        <nav className="space-y-2 mt-2">
          <button className="w-full justify-start text-white hover:bg-gray-700 flex items-center p-2 rounded">
            <Image src="/assets/My Queue.svg" alt="Queue" width={16} height={16} className="w-4 h-4 mr-3" />
            My Queue
          </button>
          <button className="w-full justify-start text-white hover:bg-gray-700 flex items-center p-2 rounded">
            <Image src="/assets/My Podcasts.svg" alt="Podcast" width={16} height={16} className="w-4 h-4 mr-3" />
            My Podcasts
        </button>
          <button className="w-full justify-start text-white hover:bg-gray-700 flex items-center p-2 rounded">
            <Image src="/assets/Recents.svg" alt="Recents" width={16} height={16} className="w-4 h-4 mr-3" />
            Recents
          </button>
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4">
        <div className="text-xs text-[#747474] space-y-1">
          <div>Podbay v2.9.6 by <a href="https://fancysoups.com/" className="text-[#747474] hover:underline">Fancy Soups.</a></div>
          <div className="space-x-2">
            <a href="#" className="text-[#747474] hover:underline">About</a>
            <a href="#" className="text-[#747474] hover:underline">All Podcasts</a>
          </div>
        </div>
      </div>
    </div>
    )
}