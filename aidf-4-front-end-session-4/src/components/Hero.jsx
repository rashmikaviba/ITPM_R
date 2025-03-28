import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

export default function Hero() {
  
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-white text-center px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Find Your Best Staycation
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl">
          Describe your dream destination and experience, and we'll find the
          perfect place for you.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-4xl bg-black/50 backdrop-blur-md rounded-full p-4 flex items-center"
        >
          <Input
            type="text"
            placeholder="Describe your destination, experience, or hotel..."          
            className="flex-grow bg-transparent text-white placeholder:text-white/70 border-none outline-none focus:outline-none focus-visible:ring-0 px-6 text-lg"
          />
          <Button
            type="submit"
            className="rounded-full w-56 flex items-center gap-x-3 h-14 bg-teal-800 hover:bg-sky-600"
          >
            <Sparkles
              style={{ width: "24px", height: "24px" }}
              className="animate-pulse text-white"
            />
            <span className="text-lg">AI Search</span>
          </Button>
        </form>
      </div>
    </div>
  );
}