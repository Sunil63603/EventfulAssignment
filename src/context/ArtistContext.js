"use client";

import { createContext, useContext, useState, useMemo } from "react";
import artistsData from "@/data/artists.json";

const ArtistContext = createContext();

export const useArtists = () => {
  const context = useContext(ArtistContext);

  if (!context) {
    throw new Error(`useArtists must be used within an ArtistProvider`);
  }

  return context;
};

export const ArtistProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    fee: "",
  });

  const filteredArtists = useMemo(() => {
    return artistsData.filter((artist) => {
      return (
        (!filters.category || artist.category === filters.category) &&
        (!filters.location || artist.location === filters.location) &&
        (!filters.fee || artist.fee === filters.fee)
      );
    });
  }, [filters]);

  const hasActiveFilters = !!(
    filters.category ||
    filters.location ||
    filters.fee
  );

  const value = {
    filters,
    setFilters,
    filteredArtists,
    hasActiveFilters,
    artists: artistsData,
  };

  return (
    <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>
  );
};
