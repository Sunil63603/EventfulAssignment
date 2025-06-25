//ArtistProvider is used to share data between multiple artist-listing files/components
import { ArtistProvider } from "@/context/ArtistContext";

//These two are client-components
import { ArtistGrid } from "@/components/artists/ArtistGrid.jsx";
import { ArtistFilters } from "@/components/artists/ArtistFilters";

const ArtistListingPageContent = () => {
  return (
    <div className="space-y-4">
      <ArtistFilters />
      <ArtistGrid />
    </div>
  );
};

//wwrapping provider around 'artist-listing'
export default function ArtistListingPage() {
  return (
    <ArtistProvider>
      <ArtistListingPageContent />
    </ArtistProvider>
  );
}
