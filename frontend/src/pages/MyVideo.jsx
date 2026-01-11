import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyVideos } from "../api/video"; 
import { Clock, BarChart, Eye, Play, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const MyVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const docs = await getMyVideos();
        setVideos(docs);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-6 md:p-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Creator Studio
            </h1>
            <p className="text-slate-500 font-medium mt-2">Manage your high-fidelity content library.</p>
          </motion.div>

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
          >
            <Plus size={20} />
            New Upload
          </button>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <VideoSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard 
                key={video._id} 
                video={video} 
                // Navigate to the watch page instead of opening a modal
                onClick={() => navigate(`/watch/${video._id}`)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const VideoCard = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId={video._id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group cursor-pointer bg-[#0F0F12] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-indigo-500/50 transition-all duration-500"
    >
      <div className="aspect-video relative overflow-hidden bg-zinc-900">
        {isHovered ? (
          <video
            src={video.videoFile}
            className="w-full h-full object-cover"
            autoPlay muted loop playsInline
          />
        ) : (
          <img src={video.thumbnail} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="" />
        )}

        <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1.5 rounded-xl text-[10px] font-black backdrop-blur-md bg-black/40 border border-white/10 text-white flex items-center gap-2">
                <Eye size={14} className="text-indigo-400" />
                {video.views?.toLocaleString() || 0}
            </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] to-transparent opacity-60" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
          {video.title}
        </h3>
        
        <div className="flex items-center gap-6 mt-6 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-indigo-500" />
            {formatDistanceToNow(new Date(video.createdAt))} ago
          </div>
          <div className="flex items-center gap-2">
            <BarChart size={14} className="text-indigo-500" />
            Insights
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VideoSkeleton = () => (
    <div className="bg-white/5 rounded-[2.5rem] h-80 animate-pulse border border-white/5" />
);

export default MyVideos;