import { useEffect } from "react";
import { useTripStore } from "@/store/Trip";
import TripCard from "@/components/ui/TripCard";

function ViewTrip() {
  const { fetchTrips, trips } = useTripStore();

  useEffect(() => {
    fetchTrips();
  }, []);

  console.log("trips:", trips);

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
