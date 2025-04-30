import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">Dominique Ch.</span>
      </div>
      <div className="flex items-center bg-gray-100 p-2 rounded-lg">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Quick search"
          className="bg-transparent focus:outline-none ml-2"
        />
      </div>
      <Bell className="text-gray-500 cursor-pointer" />
    </div>
  );
};

export default Navbar;
