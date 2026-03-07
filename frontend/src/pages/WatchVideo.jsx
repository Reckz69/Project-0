import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoViews } from "../api/video"; // Use your existing Axios-linked API
import { ArrowLeft, Share2, Info, Eye, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

const WatchVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initTheater = async () => {
      try {
        setLoading(true);
        
        // 1. Fetching specific video using the ID
        // Note: Using standard fetch here, but ensure it matches your backend route exactly
        const response = await fetch(`http://localhost:8000/api/v1/videos/${videoId}`, { 
          credentials: "include" 
        });
        const result = await response.json();
  
        if (result.success) {
          setVideo(result.data); 
          
          // 2. Background view update
          getVideoViews(videoId).catch(() => console.log("View count skipped"));
        } else {
          console.error("Video not found");
          navigate("/"); 
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    if (videoId) initTheater();
  }, [videoId, navigate]);

  // Handle clicking on creator to go to their profile
  const handleProfileClick = () => {
    if (video?.owner?.username) {
      navigate(`/user/${video.owner.username}`);
    }
  };

  if (loading || !video) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 animate-pulse font-bold tracking-widest uppercase text-xs">Initializing Theater</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 pb-20">
      <nav className="p-6 flex items-center justify-between sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full transition-all text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
          <span className="font-bold text-sm">Back</span>
        </button>
        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all text-slate-400 hover:text-white">
          <Share2 size={20} />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Video Player & Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div layoutId={videoId} className="aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
            <video 
                src={video.videoFile} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
            />
          </motion.div>
          
          <div className="px-2">
            <h1 className="text-4xl font-black tracking-tight leading-tight">{video.title}</h1>
            
            {/* NEW: Creator Info Section */}
            <div className="flex items-center justify-between mt-8 p-1">
              <div 
                onClick={handleProfileClick}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <img 
                  src={video.owner?.avatar || `https://ui-avatars.com/api/?name=${video.owner?.username}`} 
                  alt="avatar" 
                  className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-indigo-500 transition-all object-cover" 
                />
                <div className="flex flex-col">
                  <span className="font-black text-lg group-hover:text-indigo-400 transition-colors">
                    {video.owner?.fullName || video.owner?.username}
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    @{video.owner?.username}
                  </span>
                </div>
              </div>
              
              <button className="px-8 py-3 bg-white text-black font-black rounded-full hover:bg-indigo-500 hover:text-white transition-all text-sm uppercase tracking-widest">
                Follow
              </button>
            </div>

            <div className="h-px bg-white/5 w-full my-8" />

            <div className="flex items-center gap-8 text-xs font-black uppercase tracking-[0.2em]">
               <div className="flex items-center gap-2 text-indigo-400">
                  <Eye size={16} /> {video.views} Views
               </div>
               <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={16} /> {new Date(video.createdAt).toDateString()}
               </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar / Description */}
        <aside className="space-y-6">
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest mb-6">
              <Info size={16} /> Description
            </div>
            <p className="text-slate-400 leading-relaxed font-medium text-sm whitespace-pre-wrap">
              {video.description || "The creator hasn't added a description yet."}
            </p>
          </div>
          
          {/* You can add "Related Videos" or "Comments" components here later */}
        </aside>
      </main>
    </div>
  );
};

export default WatchVideo;