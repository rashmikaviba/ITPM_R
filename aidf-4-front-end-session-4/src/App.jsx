import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HotelListings from "./components/HotelListings";
import Createpage from "./components/ui/Createpage";
import { Routes, Route } from 'react-router-dom';
import ViewTrip from "./components/ui/viewTrip";


const App = () => {

  return (
    <>
      <Navigation name="Manupa" />
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<div><Hero /><HotelListings /></div>} />
        <Route path="/createpage" element={<Createpage />} />
        <Route path="/ViewTrip" element={<ViewTrip />} />
        {/* Add more routes if needed */}
      </Routes>
    </>
  );
};

export default App;

