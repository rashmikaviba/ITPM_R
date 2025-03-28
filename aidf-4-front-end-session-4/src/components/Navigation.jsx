import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

function Navigation(p) {
  return (
    <nav className="z-10 bg-black flex items-center justify-between px-12 py-6 text-white shadow-lg">
      {/* Logo and Links */}
      <div className="flex items-center space-x-12">
        <a href="/" className="text-3xl font-bold tracking-wide">
        travel-expert
        </a>
        <div className="hidden md:flex space-x-8 text-lg">
          <a href={`/`} className="hover:text-gray-300 transition-colors">
            Home
          </a>
          <a href={`/about`} className="hover:text-gray-300 transition-colors">
            About
          </a>
          <a href={`/contact`} className="hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-6">
        <Button variant="ghost" className="flex items-center gap-x-2 text-lg">
          <Globe className="h-6 w-6" />
          EN
        </Button>
        <Button variant="ghost" asChild>
          <a href="/createpage" className="text-lg hover:text-gray-300">
            Create Trip
          </a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="/sign-in" className="text-lg hover:text-gray-300">
            Log In
          </a>
        </Button>
        <Button
          asChild
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full text-lg"
        >
          <a href="/sign-up">Sign Up</a>
        </Button>
      </div>
    </nav>
  );
}

export default Navigation;  