import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyVideos, getVideoViews } from "../api/video"; 
import { ArrowLeft, Share2, Info, Eye, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const WatchVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initTheater = async () => {
      try {
        const all = await getMyVideos();
        const current = all.find(v => v._id === videoId);
        setVideo(current);
        await getVideoViews(videoId); // Real view count update
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    initTheater();
  }, [videoId]);

  if (loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500">
      <nav className="p-6 flex items-center justify-between sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <button onClick={() => navigate("/my-videos")} className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-full transition-all text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
          <span className="font-bold text-sm">Library</span>
        </button>
        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all">
          <Share2 size={20} />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Video Player */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div layoutId={videoId} className="aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
            <video src={video.videoFile} controls autoPlay className="w-full h-full" />
          </motion.div>
          
          <div className="px-2">
            <h1 className="text-4xl font-black tracking-tight">{video.title}</h1>
            <div className="flex items-center gap-6 mt-4">
               <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-widest">
                  <Eye size={18} /> {video.views + 1} Views
               </div>
               <div className="flex items-center gap-2 text-slate-500 font-bold text-sm uppercase tracking-widest">
                  <Calendar size={18} /> {new Date(video.createdAt).toLocaleDateString()}
               </div>
            </div>
          </div>
        </div>

        {/* Right: Info Panel */}
        <aside className="space-y-6">
          <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem]">
            <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest mb-6">
              <Info size={16} /> Description
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              {video.description || "No description provided."}
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default WatchVideo;