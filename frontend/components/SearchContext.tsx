'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface ITunesTrackItem {
  wrapperType: string;
  trackName?: string;
  trackCensoredName?: string;
  artistName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  trackTimeMillis?: number;
  isStreamable?: boolean;
  trackPrice?: number;
  trackExplicitness?: string;
  discNumber?: number;
  trackNumber?: number;
}

interface ITunesResponse {
  results: ITunesTrackItem[];
}

interface SearchContextType {
  searchResults: Track[];
  isSearching: boolean;
  hasSearched: boolean;
  searchTerm: string;
  setSearchResults: (results: Track[]) => void;
  setIsSearching: (loading: boolean) => void;
  setHasSearched: (searched: boolean) => void;
  setSearchTerm: (term: string) => void;
  performSearch: (term: string) => Promise<void>;
  refreshMainTracks: () => void;
  setRefreshMainTracks: (refreshFn: () => void) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshMainTracks, setRefreshMainTracks] = useState<() => void>(() => () => {});

  const performSearch = async (term: string) => {
    if (!term.trim()) return;
    
    try {
      setIsSearching(true);
      setSearchTerm(term);
      
      const response = await fetch(`http://localhost:3000/search/itunes?term=${encodeURIComponent(term)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data: ITunesResponse = await response.json();
      
      // Transform iTunes API results to match our Track interface
      const transformedResults: Track[] = data.results
        .filter((item: ITunesTrackItem) => item.wrapperType === 'track')
        .map((item: ITunesTrackItem) => ({
          title: item.trackName || item.trackCensoredName || 'Unknown Title',
          artist: item.artistName || 'Unknown Artist',
          coverImage: item.artworkUrl100 || '',
          previewUrl: item.previewUrl || '',
          releaseDate: item.releaseDate || '',
          genre: item.primaryGenreName || '',
          durationMs: item.trackTimeMillis || 0,
          isStreamable: item.isStreamable || null,
          price: item.trackPrice?.toString() || 'N/A',
          explicitness: item.trackExplicitness || '',
          discNumber: item.discNumber || 1,
          trackNumber: item.trackNumber || 1,
        }));
      
      setSearchResults(transformedResults);
      setHasSearched(true);
      
      // Refresh the main tracks list after search to include newly saved tracks
      setTimeout(() => {
        refreshMainTracks();
      }, 500); // Small delay to ensure database operations complete
      
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const value: SearchContextType = {
    searchResults,
    isSearching,
    hasSearched,
    searchTerm,
    setSearchResults,
    setIsSearching,
    setHasSearched,
    setSearchTerm,
    performSearch,
    refreshMainTracks,
    setRefreshMainTracks,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 