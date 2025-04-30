import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Explicitly import autoTable


const Dashboard = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Get user session
        const sessionResponse = await axios.get(
          "http://localhost:5000/session",
          { withCredentials: true }
        );

        if (!sessionResponse.data.email) {
          setError("No user session found. Please log in.");
          setLoading(false);
          return;
        }

        const userEmail = sessionResponse.data.email;

        // Fetch reservations using the user's email
        const response = await axios.get(
          `http://localhost:5000/dashboard/reservations/${userEmail}`,
          { withCredentials: true }
        );

        setReservations(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Sort reservations by date
  const sortedData = [...reservations].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  // Toggle sorting order
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to download reservations as PDF
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reservations Report", 10, 10);

    const tableColumn = ["Reservation", "Date", "Number of Rooms", "City"];
    const tableRows = reservations.map((row) => [
      row.reservation,
      new Date(row.date).toLocaleString(),
      row.rooms,
      row.city,
    ]);

    // Ensure that autoTable is correctly initialized
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("reservations_report.pdf");
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button
          onClick={downloadReport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Download Report
        </button>
      </div>

      {loading ? (
        <p>Loading reservations...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-hidden shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="p-3">Reservation</th>
                <th className="p-3 cursor-pointer" onClick={toggleSort}>
                  Date {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th className="p-3">Number of rooms</th>
                <th className="p-3">City</th>
                <th className="p-3">Quick Link</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length > 0 ? (
                sortedData.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{row.reservation}</td>
                    <td className="p-3">
                      {new Date(row.date).toLocaleString()}
                    </td>
                    <td className="p-3">{row.rooms}</td>
                    <td className="p-3">{row.city}</td>
                    <td className="p-3 text-blue-500 cursor-pointer">View</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No reservations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
