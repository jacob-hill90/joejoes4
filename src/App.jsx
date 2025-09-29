import { useState, useRef, useEffect } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import News from "./components/News";
import Countdown from "./components/Countdown";
import Lodging from "./components/Lodging";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const menuRef = useRef(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "gallery":
        return <Gallery />;
      case "news":
        return <News />;
      case "lodging":
        return <Lodging />;

      default:
        return (
          <div className="text-center py-20 text-lg bg-red-50">
            <h1 className="text-4xl font-bold text-red-800">404</h1>
            <p className="text-gray-700 mt-4">Page not found!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <header className="py-4 px-6 flex items-center justify-between relative">
        {/* Left Section: Empty spacer for desktop layout */}
        <div className="hidden md:block w-1/3"></div>

        {/* Center Section: Logo */}
        <div className="w-full md:w-1/3 flex justify-center ml-4">
          <img
            src="/joejoelogo.png"
            onClick={() => window.location.reload()}
            alt="JoeJoe's Logo"
            className="h-24 object-contain cursor-pointer"
          />
        </div>

        {/* Right Section: Navigation */}
        <nav className="absolute right-6 top-4 md:static md:w-1/3 flex justify-end items-center">
          <div className="hidden md:flex gap-4">
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => setActiveTab("gallery")}
            >
              Gallery
            </button>
            {/* 🆕 News tab */}
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => setActiveTab("news")}
            >
              News
            </button>
             <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => setActiveTab("lodging")}
            >
              Lodging
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-4xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full opacity-95 bg-gray-800 text-white flex flex-col shadow-md z-50"
          >
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => {
                setActiveTab("home");
                setMenuOpen(false); // Close the mobile menu
              }}
            >
              Home
            </button>
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => {
                setActiveTab("about");
                setMenuOpen(false); // Close the mobile menu
              }}
            >
              About
            </button>
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => {
                setActiveTab("gallery");
                setMenuOpen(false); // Close the mobile menu
              }}
            >
              Gallery
            </button>
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => {
                setActiveTab("news");
                setMenuOpen(false); // Close the news menu
              }}
            >
              News
            </button>
            <button
              className="py-2 px-4 rounded hover:underline decoration-2 underline-offset-4"
              onClick={() => {
                setActiveTab("lodging");
                setMenuOpen(false); 
              }}
            >
              Lodging
            </button>
          </div>
        )}
      </header>

      <main className="flex-grow bg-[#f8f9fa] ">{renderContent()}</main>

      <footer className="bg-[#f8f9fa] pt-12 text-black text-center py-4">
        <Countdown targetDate="2025-10-25T10:30:00" />
        <p className="text-sm">&copy; {currentYear} JoeJoesTailgate</p>
      </footer>
    </div>
  );
}

export default App;
