//shadcn imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

//used to display all submissions in Table
import artists from "@/data/artists.json";

//meta-data for each and every page for better SEO
export const metadata = {
  title: "Manager Dashboard | Artist Booking",
  description: "View all artist submissions",
};

export default function ManagerDashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Artist Submissions</h2>

      {/* Overflow-x-auto for mobile screens */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {artists.map((artist) => (
              <TableRow key={artist.id}>
                <TableCell>{artist.name}</TableCell>
                <TableCell>{artist.category}</TableCell>
                <TableCell>{artist.location || "N/A"}</TableCell>
                <TableCell>{artist.fee || "N/A"}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
