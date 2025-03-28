import { useEffect } from "react";
import { useTripStore } from "@/store/Trip";
import TripCard from "@/components/ui/TripCard";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

function ViewTrip() {
  const { fetchTrips, trips } = useTripStore();

  useEffect(() => {
    fetchTrips();
  }, []);

  console.log("trips:", trips);

  // Function to generate the report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Trip Report", 14, 20);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleString(), 14, 30);

    let y = 40; // Starting Y position for trip details
    trips.forEach((trip, index) => {
      doc.text(`Trip ${index + 1}:`, 14, y);
      doc.text(`- Destination: ${trip.destination}`, 20, y + 10);
      doc.text(`- Start Date: ${trip.startDate}`, 20, y + 20);
      doc.text(`- End Date: ${trip.endDate}`, 20, y + 30);
      doc.text(`- Description: ${trip.description}`, 20, y + 40);
      y += 50; // Move to the next trip section

      // Add a new page if the content exceeds the page height
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("Trip_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Your Trips
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Browse and manage your trips.
          </p>
        </div>

        {/* Report Generator Button */}
        <div className="text-center mb-8">
          <Button
            onClick={generateReport}
            className="bg-sky-950 hover:bg-sky-600 text-white px-6 py-3 rounded-lg text-lg shadow-md"
          >
            Generate Report
            <Sparkles
                          style={{ width: "24px", height: "24px" }}
                          className="animate-pulse text-white"
                        />
          </Button>
        </div>

        {/* Trip Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
              >
                <TripCard key={trip._id} trip={trip} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
              No trips available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;