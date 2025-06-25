"use client";

//JSON data import
import artistsData from "@/data/artists.json";

//shadcn components
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//NextJS imports
import Link from "next/link";

//method which returns all unique values. (ie,unique categories in this case)
import { getUniqueValues } from "../artists/ArtistFilters";

export default function LandingPage() {
  const categories = getUniqueValues(artistsData, "category");

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to Artist Booking</h1>
        <p className="text-gray-600">
          A platform to discover and book the best performing artists.
        </p>
        <Link href="/listing">
          <Button className="mt-2">Explore Artists</Button>
        </Link>
      </section>

      {/* Category Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="text-center">
            <CardContent>
              <CardTitle>{category}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
