import { Link, NavLink, useNavigate } from "react-router-dom"; // Added useNavigate
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect, useRef } from "react"; // Added useRef
import { 
  LayoutDashboard, 
  LogOut, 
  Compass, 
  Home as HomeIcon, 
  Info, 
  ChevronDown, 
  Search, 
  Zap,
  Settings,
  Fingerprint,
  Loader2 // Added for a loading spinner
} from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  // NEW STATES FOR SEARCH
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // DEBOUNCED SEARCH LOGIC
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/videos/search?query=${query}`,
          { credentials: "include" }
        );
        const json = await res.json();
        
        // Ensure we access .data from your ApiResponse wrapper
        if (json.success) {
          setResults(json.data || []);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      setSearchOpen(false); // Close the dropdown
      // Navigate to the SearchPage with the query
      navigate(`/search?query=${encodeURIComponent(query)}`); 
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? "py-3 bg-[#030303]/80 backdrop-blur-md border-b border-white/5 shadow-2xl" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* --- LEFT: FLUX PRISM BRANDING --- */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-500/50">
                  <Fingerprint className="text-white w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
              <span className="text-xl font-light tracking-tight text-white">
                Project <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">X</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {[
                { name: "Home", path: "/", icon: <HomeIcon size={16} /> },
                { name: "Explore", path: "/explore", icon: <Compass size={16} /> },
                { name: "About", path: "/about", icon: <Info size={16} /> },
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? "text-white bg-white/5 border border-white/5" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center gap-3" ref={searchRef}>
            
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-lg transition-all ${searchOpen ? "text-indigo-400 bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
                <Search size={20} />
            </button>

            {searchOpen && (
              <div className="absolute top-14 right-0 w-80 bg-[#0a0a0a]/95 border border-white/10 rounded-2xl shadow-2xl p-2 z-[110] animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search videos or creators..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 outline-none focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm text-white"

                    
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-3 animate-spin text-indigo-500" size={18} />
                  )}
                  
                </div>

                {/* SEARCH RESULTS DROPDOWN */}
                
                  <div className="mt-2 max-h-72 overflow-y-auto custom-scrollbar">
                    {results.length > 0 ? (
                      results.map((item) => {
                        // Check if this specific result is a Creator match
                        const isCreator = item.isOwnerMatch; 
                        
                        return (
                          <Link
                            key={item._id}
                            // LOGIC: If query matches creator, go to profile. If video, go to Search Page.
                            to={isCreator 
                              ? `/user/${item.owner?.username}` 
                              : `/search?query=${encodeURIComponent(item.title)}`
                            }
                            onClick={() => {
                              setSearchOpen(false);
                              setQuery("");
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-all group"
                          >
                            <img 
                              src={isCreator ? item.owner?.avatar : item.thumbnail} 
                              className={`w-12 h-12 object-cover border border-white/10 ${isCreator ? 'rounded-full' : 'rounded-lg'}`} 
                              alt="" 
                            />
                            
                            <div className="flex flex-col overflow-hidden">
                              <span className="text-sm text-slate-200 group-hover:text-white truncate font-medium">
                                {isCreator ? item.owner?.fullName : item.title}
                              </span>
                              <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest">
                                {isCreator ? `@${item.owner?.username} • Creator` : `${item.views} views • ${item.owner?.username}`}
                              </span>
                            </div>
                          </Link>
                        );
                      })
                    ) : query.length >= 2 && !isSearching ? (
                      <div className="p-4 text-center text-xs text-slate-500">No results found.</div>
                    ) : null}
                  </div>
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard" 
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-sm font-medium shadow-lg shadow-indigo-600/20"
                >
                  <Zap size={14} /> Studio
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pr-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-2 z-[110] animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
                      <div className="px-3 py-3 border-b border-white/5 mb-1">
                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">Authenticated</p>
                        <p className="text-sm font-semibold text-white truncate">{user?.fullName || user?.username}</p>
                      </div>

                      <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      
                      <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <Settings size={16} /> Settings
                      </Link>
                      
                      <button 
                        onClick={() => { logout(); setIsProfileOpen(false); }} 
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-400/10 rounded-xl transition-all mt-1"
                      >
                        <LogOut size={16} /> Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">Sign in</Link>
                <Link to="/register" className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;