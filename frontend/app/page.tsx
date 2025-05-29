'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

interface Track {
  title: string;
  artist: string;
  coverImage: string;
  previewUrl: string;
  releaseDate: string;
  genre: string;
  durationMs: number;
  isStreamable: boolean | null;
  price: string;
  explicitness: string;
  discNumber: number;
  trackNumber: number;
}

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/artist/tracks');
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await response.json();
        setTracks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const handleTrackClick = (track: Track) => {
    // Handle track click - could play preview or navigate to detail page
    console.log('Clicked track:', track);
    if (track.previewUrl) {
      const audio = new Audio(track.previewUrl);
      audio.play();
    }
  };

  const handleMoreOptions = (e: React.MouseEvent, track: Track) => {
    e.stopPropagation();
    // Handle more options click
    console.log('More options for:', track);
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#161727]">
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2">Trending tracks in all genres</h1>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
        <div className="h-px bg-gray-800 w-full mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="bg-[#18192a] rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-600"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#161727] min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-[#161727] z-10 pb-4 mt-6">
        <h1 className="text-white text-l font-bold">Trending tracks in all genres</h1>
        <p className="text-gray-400 text-sm">The world&apos;s most popular tracks</p>
      </div>
      
      {/* Separator */}
      <div className="h-px bg-gray-800 w-full mb-4"></div>
      
      {/* Track Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tracks.map((track, index) => (
          <div 
            key={index}
            className="bg-[#18192a] rounded-lg overflow-hidden hover:bg-[#23243a] transition-colors cursor-pointer"
            onClick={() => handleTrackClick(track)}
          >
            <div className="aspect-square bg-gray-600 flex items-center justify-center">
              {track.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={track.coverImage} 
                  alt={`${track.title} cover`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-xs text-center">
                  Track Cover<br />Image
                </div>
              )}
            </div>
            <div className="p-3 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-400 text-s">#{index + 1}</h3>
                  <h3 className="text-white font-medium text-sm line-clamp-2 truncate">{track.title}</h3>
                </div>
                <p className="ml-6 text-gray-400 text-xs">{track.artist}</p>
                <p className="ml-6 text-gray-500 text-xs">{track.genre}</p>
              </div>
              <button 
                className="p-1 rounded hover:bg-[#2a2b3d] transition-colors"
                onClick={(e) => handleMoreOptions(e, track)}
              >
                <Image 
                  src="/assets/more.svg" 
                  alt="More options" 
                  width={16} 
                  height={16} 
                  className="text-gray-400 hover:text-white transition-colors" 
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
