"use client";

//for caching(performance optimization)
import { useMemo } from "react";

//this context is shared between all 'artist-listing' components
import { useArtists } from "@/context/ArtistContext";

//this function is used in all dropdowns(to display unique options)
export const getUniqueValues = (data, key) => [
  ...new Set(data.map((item) => item[key])),
];

export const ArtistFilters = () => {
  const { filters, setFilters, artists } = useArtists();

  //3 filtering choices
  const { categories, locations, fees } = useMemo(
    () => ({
      categories: getUniqueValues(artists, "category"),
      locations: getUniqueValues(artists, "location"),
      fees: getUniqueValues(artists, "fee"),
    }),
    [artists]
  );

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <select
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        value={filters.location}
        onChange={(e) => handleChange("location", e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">All Locations</option>
        {locations.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>
      <select
        value={filters.fee}
        onChange={(e) => handleChange("fee", e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">All Fees</option>
        {fees.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
    </div>
  );
};
