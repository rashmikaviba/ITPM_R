import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HotelListings from "./components/HotelListings";
import Createpage from "./components/ui/Createpage";
import { Routes, Route } from 'react-router-dom';
import ViewTrip from "./components/ui/viewTrip";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import UserProfileForm from "./UserProfileForm";
import SecuritySettings from "./SecuritySettings";

const App = () => {

  return (
    <>
      <Navigation name="Manupa" />
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<div><Hero /><HotelListings /></div>} />
        <Route path="/createpage" element={<Createpage />} />
        <Route path="/ViewTrip" element={<ViewTrip />} />
        <Route path="//sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/UserProfileForm" element={<UserProfileForm />} />
        <Route path="/SecuritySettings" element={<SecuritySettings />} />
        {/* Add more routes if needed */}
      </Routes>
    </>
  );
};

export default App;

