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
        <Route path="/Profile" element={<div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <div className="p-6">
                    <Profile />
                  </div>
                </div>
              </div>} />
        <Route path="/UserProfileForm" element={<div className="flex">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <div className="p-6">
                    <UserProfileForm />
                  </div>
                </div>
              </div>} />
        <Route path="/SecuritySettings" element={<div className="flex">
                <SettingsSidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <div className="p-6">
                    <SecuritySettings />
                  </div>
                </div>
              </div>} />
        {/* Add more routes if needed */}
      </Routes>
    </>
  );
};

export default App;

