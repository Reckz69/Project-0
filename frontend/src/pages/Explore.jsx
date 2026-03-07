import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Flame, Gamepad2, Music2, Clapperboard, Trophy, 
  ArrowRight, Play, Clock, Eye, Sparkles, ChevronRight 
} from "lucide-react";

const Explore = () => {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "All", icon: <Flame size={16} /> },
    { name: "Gaming", icon: <Gamepad2 size={16} /> },
    { name: "Music", icon: <Music2 size={16} /> },
    { name: "Movies", icon: <Clapperboard size={16} /> },
    { name: "Sports", icon: <Trophy size={16} /> },
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Simulated API Delay
        setTimeout(() => setLoading(false), 800);
      } catch (error) {
        console.error("Failed to fetch explore content", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 selection:bg-indigo-500/30 overflow-hidden">
      
      {/* --- FLUX LIGHTING --- */}
      <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-semibold mb-6">
            <Sparkles size={14} /> Discovery Mode
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
            Explore <span className="font-bold text-slate-500">Trending.</span>
          </h1>
          <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
            Discover the most popular videos across the platform, curated by our high-performance engine.
          </p>
        </div>

        {/* --- CATEGORY SELECTOR --- */}
        <div className="flex items-center gap-3 overflow-x-auto pb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl whitespace-nowrap text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.name 
                ? "bg-white text-black border-white shadow-xl scale-105" 
                : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* --- VIDEO GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {loading ? (
             // SKELETON STATE
             [1, 2, 3, 6].map((i) => (
               <div key={i} className="animate-pulse space-y-4">
                 <div className="aspect-video bg-white/5 rounded-3xl" />
                 <div className="h-4 bg-white/5 rounded w-3/4" />
                 <div className="h-3 bg-white/5 rounded w-1/2" />
               </div>
             ))
          ) : (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group cursor-pointer">
                {/* VIDEO THUMBNAIL */}
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-5 border border-white/5 bg-white/[0.02] transition-all duration-500 group-hover:border-indigo-500/30 group-hover:-translate-y-2 shadow-2xl">
                  <img 
                    src={`https://picsum.photos/seed/${i + 12}/800/450`} 
                    alt="Thumbnail" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* TIME BADGE */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white">
                    12:45
                  </div>

                  {/* PLAY OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <Play size={20} fill="black" />
                    </div>
                  </div>
                </div>

                {/* VIDEO INFO */}
                <div className="flex gap-4 px-1">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${i}`} 
                    className="w-10 h-10 rounded-full border border-white/10 object-cover" 
                    alt="Avatar" 
                  />
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-lg text-white leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
                      Why ProjectX is the Future of Streaming Architecture
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span>Creator Studio</span>
                      <span className="w-1 h-1 rounded-full bg-slate-800" />
                      <span>420K views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="mt-40 relative py-20 px-10 rounded-[3rem] overflow-hidden border border-white/5 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Ready to share your story?
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-lg mb-10 font-light">
              Join thousands of creators and start uploading your videos today with our high-performance studio.
            </p>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              Go to Studio <ChevronRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Explore;