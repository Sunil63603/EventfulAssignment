"use client";

//this context file is used to share data between all 'artist-listing' file
import { useArtists } from "@/context/ArtistContext";

//shadcn components
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//NextJS imports.
import Image from "next/image";

//Icons used in each and every card
import { StarIcon } from "../../../public/icons/StarIcon";
import { LocationIcon } from "../../../public/icons/LocationIcon"; // Assuming you created this

const ArtistCard = ({ artist }) => (
  <Card
    key={artist.id}
    className="flex flex-col h-full border-2 border-gray-200 hover:bg-gray-100 transition-colors duration-200 shadow-md hover:shadow-lg"
  >
    <Image
      src={artist.imageUrl}
      alt={artist.name}
      width={120}
      height={120}
      className="object-cover w-full h-48 rounded-t-lg"
    />
    <CardContent className="flex-1 flex flex-col justify-between p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold">{artist.name}</CardTitle>
          <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
            {artist.fee}
          </span>
        </div>
        <p className="flex items-center text-sm text-gray-600">
          <StarIcon className="h-4 w-4 mr-1.5" />
          {artist.category}
        </p>
        <p className="flex items-center text-sm text-gray-500">
          <LocationIcon className="h-4 w-4 mr-1.5" />
          {artist.location}
        </p>
      </div>
      <div className="mt-auto pt-4">
        <Button
          variant="default"
          className="w-full"
          onClick={() => alert(`Quote requested for ${artist.name}`)}
        >
          Ask for quote
        </Button>
      </div>
    </CardContent>
  </Card>
);

export const ArtistGrid = () => {
  const { filteredArtists, hasActiveFilters } = useArtists();

  if (filteredArtists.length === 0 && hasActiveFilters) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">
          No artists found with the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredArtists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};
