import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Play, 
  Search, 
  ChevronRight,
  MonitorPlay,
  Zap,
  Globe,
  ArrowRight,
  LayoutGrid,
  Tv
} from "lucide-react";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 selection:bg-indigo-500/30 overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.1] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-indigo-400 text-xs font-semibold mb-8">
            <Tv size={14} /> New: Ultra-HD Streaming is here
          </div>
          
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-white mb-8 leading-[1.1]">
            Your favorite stories, <br />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-slate-400">
                beautifully delivered.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
            Stream high-quality videos, follow your favorite creators, and manage your own studio—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary Action */}
            <Link
              to="/explore"
              className="group relative px-10 py-4 overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-indigo-600 transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent" />
              <span className="relative flex items-center gap-2 text-white font-semibold tracking-wide">
                Watch Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            {/* Simple Search */}
            <div className="relative group w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search videos..." 
                    className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm"
                />
            </div>
          </div>
        </div>

        {/* --- FEATURE BAR: SIMPLE TERMS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem] mb-32 backdrop-blur-sm">
          <StatFlux icon={<MonitorPlay size={20} />} label="4K Quality" />
          <StatFlux icon={<Globe size={20} />} label="Watch Anywhere" />
          <StatFlux icon={<LayoutGrid size={20} />} label="Creator Studio" />
          <StatFlux icon={<Zap size={20} />} label="Fast Loading" />
        </div>

        {/* --- SECTION HEADER --- */}
        <div className="flex items-end justify-between mb-12 px-2">
          <div>
            <h2 className="text-4xl font-semibold text-white tracking-tight">Trending <span className="text-slate-600 font-light">Videos</span></h2>
          </div>
          <Link to="/explore" className="group text-sm font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            See all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
          
        {/* --- VIDEO GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <FluxVideoCard 
              thumbnail="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000" 
              title="Modern Interior Design" 
              creator="Design Studio" 
              views="1.2M" 
          />
          <FluxVideoCard 
              thumbnail="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000" 
              title="Coding for Beginners" 
              creator="Tech Academy" 
              views="850K" 
          />
          <FluxVideoCard 
              thumbnail="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000" 
              title="Relaxing Lo-Fi Beats" 
              creator="Lumina Music" 
              views="2.4M" 
          />
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const StatFlux = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center py-8 rounded-[2rem] hover:bg-white/5 transition-colors group">
    <div className="text-slate-500 group-hover:text-indigo-400 transition-colors mb-3">
        {icon}
    </div>
    <span className="text-xs font-medium text-slate-500">{label}</span>
  </div>
);

const FluxVideoCard = ({ thumbnail, title, creator, views }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-6 border border-white/5 bg-white/[0.02] transition-all duration-500 group-hover:border-indigo-500/30 group-hover:-translate-y-2">
      <img 
        src={thumbnail} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
        alt={title}
      />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-14 h-14 rounded-full bg-indigo-600/90 backdrop-blur-md flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
            <Play size={24} fill="white" className="text-white ml-1" />
        </div>
      </div>
    </div>
    
    <div className="px-2 space-y-1">
        <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 tracking-tight">
            {title}
        </h3>
        <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{creator}</span>
            <span className="text-slate-600 font-medium">{views} views</span>
        </div>
    </div>
  </div>
);

export default Home;