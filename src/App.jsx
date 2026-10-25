import { useEffect, useRef, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import News from "./components/News";
import Countdown from "./components/Countdown";
import Lodging from "./components/Lodging";

// Keep the desktop and mobile menus in sync.
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
];

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mainRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close the mobile menu on an outside click/tap or Escape.
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Do not leave the dropdown open when rotating a tablet or resizing to desktop.
  useEffect(() => {
    const wideScreen = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    wideScreen.addEventListener("change", closeOnDesktop);
    return () => wideScreen.removeEventListener("change", closeOnDesktop);
  }, []);

  const navigateTo = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  };

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
          <div className="px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-[#00274c]">Page not found</h1>
            <p className="mt-3 text-gray-700">We couldn't find that page.</p>
          </div>
        );
    }
  };

  const navButtonClass = (isActive, isMobile = false) =>
    [
      "rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00274c]",
      isMobile ? "block w-full text-left" : "inline-flex items-center",
      isActive
        ? "bg-[#00274c] text-white"
        : "text-[#00274c] hover:bg-[#00274c]/10",
    ].join(" ");

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      {/* Appears only when navigating with the keyboard. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-[#00274c] focus:shadow-lg"
      >
        Skip to content
      </a>
      <header className="relative z-20 border-b border-gray-200/70 bg-[#f8f9fa]">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-3 sm:px-6 sm:py-4 lg:min-h-32 lg:justify-end lg:px-8">
          {/* Center the logo independently of the desktop navigation width. */}
          <button
            type="button"
            onClick={() => navigateTo("home")}
            aria-label="Joe Joe's Tailgate — Home"
            className="flex max-w-[calc(100%_-_4rem)] items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00274c] lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <img
              src="/joejoelogo.png"
              alt="Joe Joe's Tailgate"
              className="h-16 w-auto max-w-full object-contain sm:h-20 lg:h-24"
            />
          </button>

          {/* Desktop / wide-tablet navigation. */}
          <nav aria-label="Main navigation" className="hidden items-center justify-end gap-1 lg:flex">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => navigateTo(id)}
                aria-current={activeTab === id ? "page" : undefined}
                className={navButtonClass(activeTab === id)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile and narrow-tablet navigation. */}
          <div
            ref={menuRef}
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 sm:right-6 lg:hidden"
          >
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#00274c] shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00274c]"
            >
              {menuOpen ? (
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>

            {menuOpen && (
              <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
              >
                {NAV_ITEMS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => navigateTo(id)}
                    aria-current={activeTab === id ? "page" : undefined}
                    className={navButtonClass(activeTab === id, true)}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </div>
      </header>

      <main id="main-content" ref={mainRef} tabIndex={-1} className="min-w-0 flex-1 focus:outline-none">{renderContent()}</main>

      <footer className="border-t border-gray-200/70 bg-[#f8f9fa] px-4 pb-6 pt-6 text-center text-black sm:pt-8">
        <Countdown paused pauseMessage="Taking a break in 2026 — thanks for being part of the tradition!" />
        <p className="text-sm">&copy; {currentYear} JoeJoesTailgate</p>
      </footer>
    </div>
  );
}

export default App;
