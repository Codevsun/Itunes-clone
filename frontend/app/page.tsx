'use client'

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useSearch } from '../components/SearchContext';

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
  const [defaultTracks, setDefaultTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tracksPerPage = 15;
  
  // Get search context
  const { searchResults, isSearching, hasSearched, searchTerm, setRefreshMainTracks, setHasSearched, setSearchResults } = useSearch();

  const artistColors = ['#e3bd71', '#e86491', '#cf8163', '#6dc086', '#ff78c9', '#7272df', '#8cc1be'];

  const fetchTracks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/artist/tracks');
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      const data = await response.json();
      setDefaultTracks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  // Register the refresh function with SearchContext
  useEffect(() => {
    setRefreshMainTracks(() => fetchTracks);
  }, [setRefreshMainTracks, fetchTracks]);

  // Determine which tracks to show
  const displayTracks = hasSearched ? searchResults : defaultTracks;
  const isShowingSearchResults = hasSearched && searchResults.length > 0;
  const isShowingNoResults = hasSearched && searchResults.length === 0;

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

  const handleBackToMain = () => {
    // Clear search and show main tracks (which now include newly saved tracks)
    setHasSearched(false);
    setSearchResults([]);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastTrack = currentPage * tracksPerPage;
  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
  const currentTracks = displayTracks.slice(indexOfFirstTrack, indexOfLastTrack);
  const totalPages = Math.ceil(displayTracks.length / tracksPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset pagination when search results change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults, hasSearched]);

  if (loading && !hasSearched) {
    return (
      <div className="p-6 bg-[#161727]">
        <div className="mb-6">
          <h1 className="text-white text-2xl font-bold mb-2">Tracks in all genres</h1>
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
      <div className="sticky top-0 bg-[#161727] z-10 pb-4 mt-6 flex items-center justify-between">
        <div>
          {isSearching ? (
            <>
              <h1 className="text-white text-l font-bold">Searching...</h1>
              <p className="text-gray-400 text-sm">Looking for tracks matching &quot;{searchTerm}&quot;</p>
            </>
          ) : isShowingSearchResults ? (
            <>
              <h1 className="text-white text-l font-bold">Search Results for &quot;{searchTerm}&quot;</h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm">{searchResults.length} tracks found</p>
                <button
                  onClick={handleBackToMain}
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  ← Back to all tracks
                </button>
              </div>
            </>
          ) : isShowingNoResults ? (
            <>
              <h1 className="text-white text-l font-bold">No Results Found</h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm">No tracks found for &quot;{searchTerm}&quot;</p>
                <button
                  onClick={handleBackToMain}
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  ← Back to all tracks
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-white text-l font-bold">Trending tracks in all genres</h1>
              <p className="text-gray-400 text-sm">The world&apos;s most popular tracks {defaultTracks.length > 0 && `(${defaultTracks.length} total)`}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button 
            className="p-1.5 rounded-full hover:bg-[#23243a] text-gray-400"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || isSearching}
          >
            <Image src="/assets/right.svg" alt="next" width={15} height={15} />
          </button>
          <button 
            className="p-1.5 rounded-full hover:bg-[#23243a] text-gray-400"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || isSearching}
          >
            <Image src="/assets/left.svg" alt="previous" width={15} height={15} />
          </button>
        </div>
      </div>
      
      {/* Separator */}
      <div className="h-px bg-gray-800 w-full mb-4"></div>
      
      {/* Loading overlay for search */}
      {isSearching && (
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
      )}
      
      {/* Track Grid */}
      {!isSearching && (
        <>
          {currentTracks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentTracks.map((track, index) => (
                <div 
                  key={`${track.title}-${track.artist}-${index}`}
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
                      <h3 className="text-white font-medium text-sm line-clamp-2 truncate">{track.title}</h3>
                      <p style={{color: artistColors[Math.floor(Math.random() * artistColors.length)]}} className="text-xs">{track.artist}</p>
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
          ) : isShowingNoResults ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-gray-400 text-center">
                <h3 className="text-lg font-medium mb-2">No tracks found</h3>
                <p className="text-sm">Try searching for a different artist or song</p>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
