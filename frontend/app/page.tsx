'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

interface Podcast {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  rank: number;
  authorColor: string;
}

export default function Home() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API endpoint
    const fetchPodcasts = async () => {
      try {
        // Mock data - replace with actual API call
        const mockPodcasts: Podcast[] = [
          { id: '1', title: 'The Mel Robbins Podcast', author: 'Mel Robbins', rank: 1, authorColor: '#e3bd71'},
          { id: '2', title: 'Deep Cover', author: 'Pushkin Industries', rank: 2, authorColor: '#e86491'},
          { id: '3', title: 'Good Hang', author: 'Featuring Julia Hava', rank: 3, authorColor: '#cf8163'},
          { id: '4', title: 'The Joe Rogan Experience', author: 'Joe Rogan', rank: 4, authorColor: '#6dc086'},
          { id: '5', title: 'Crime Junkie', author: 'audiochuck', rank: 5, authorColor: '#ff78c9'},
          { id: '6', title: 'Call Her Daddy', author: 'Alex Cooper', rank: 6, authorColor: '#7272df'},
          { id: '7', title: 'This American Life', author: 'This American Life', rank: 7, authorColor: '#8cc1be'},
          { id: '8', title: 'Serial', author: 'Serial Productions', rank: 8, authorColor: '#8cc1be'},
          { id: '9', title: 'Conan O\'Brien Needs a Friend', author: 'Team Coco & Earwolf', rank: 9, authorColor: '#8cc1be'},
          { id: '10', title: 'My Favorite Murder', author: 'Exactly Right', rank: 10, authorColor: '#8cc1be'},
          { id: '11', title: 'SmartLess', author: 'Jason Bateman, Sean Hayes, Will Arnett', rank: 11, authorColor: '#8cc1be'},
          { id: '12', title: 'The Daily', author: 'The New York Times', rank: 12, authorColor: '#8cc1be'},
          { id: '13', title: 'Stuff You Should Know', author: 'iHeartPodcasts', rank: 13, authorColor: '#8cc1be'},
          { id: '14', title: 'Radiolab', author: 'WNYC Studios', rank: 14, authorColor: '#8cc1be'},
          { id: '15', title: 'The Tim Ferriss Show', author: 'Tim Ferriss', rank: 15, authorColor: '#8cc1be'},
        ];

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPodcasts(mockPodcasts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handlePodcastClick = (podcast: Podcast) => {
    // Handle podcast click - navigate to podcast detail page
    console.log('Clicked podcast:', podcast);
  };

  const handleMoreOptions = (e: React.MouseEvent, podcast: Podcast) => {
    e.stopPropagation();
    // Handle more options click
    console.log('More options for:', podcast);
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#161727]">
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2">Trending podcasts in all genres</h1>
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
        <h1 className="text-white text-l font-bold">Trending podcasts in all genres</h1>
        <p className="text-gray-400 text-sm">The world&apos;s most popular podcasts</p>
      </div>
      
      {/* Separator */}
      <div className="h-px bg-gray-800 w-full mb-4"></div>
      
      {/* Podcast Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {podcasts.map((podcast) => (
          <div 
            key={podcast.id}
            className="bg-[#18192a] rounded-lg overflow-hidden hover:bg-[#23243a] transition-colors cursor-pointer"
            onClick={() => handlePodcastClick(podcast)}
          >
            <div className="aspect-square bg-gray-600 flex items-center justify-center">
              {podcast.coverImage ? (
                <Image 
                  src={podcast.coverImage} 
                  alt={`${podcast.title} cover`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-xs text-center">
                  Podcast Cover<br />Image
                </div>
              )}
            </div>
            <div className="p-3 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-400 text-s">#{podcast.rank}</h3>
                  <h3 className="text-white font-medium text-sm line-clamp-2 truncate">{podcast.title}</h3>
                </div>
                <p className="ml-6 text-gray-400 text-xs line-clamp-1" style={{ color: podcast.authorColor }}>{podcast.author}</p>
              </div>
              <button 
                className="p-1 rounded hover:bg-[#2a2b3d] transition-colors"
                onClick={(e) => handleMoreOptions(e, podcast)}
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
