import { ArtistProvider } from "@/context/ArtistContext";
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

export default function ArtistListingPage() {
  return (
    <ArtistProvider>
      <ArtistListingPageContent />
    </ArtistProvider>
  );
}
