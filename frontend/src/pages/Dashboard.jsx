import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../api/dashboardApi";
import { getMyVideos } from "../api/video"; // Frontend API
import Loader from "../components/Loader";
import { 
  Video, Eye, Users, Heart, MessageSquare, Twitter, BarChart2, ChevronRight 
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentVideos, setRecentVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, videosRes] = await Promise.all([
          getDashboardStats(),
          getMyVideos()
        ]);
        setStats(statsRes.data.data);
        setRecentVideos(videosRes.slice(0, 3));
      } catch (error) {
        console.error("Dashboard data error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 px-6 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tight">Studio Dashboard</h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/my-videos")} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white">
              My Library
            </button>
            <button onClick={() => navigate("/upload")} className="px-5 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white flex items-center gap-2">
              <Video size={16} /> Upload Video
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Uploads" value={stats?.totalVideos} icon={<Video size={22} />} accent="indigo" />
          <StatCard label="Channel Views" value={stats?.totalVideoViews} icon={<Eye size={22} />} accent="blue" />
          <StatCard label="Subscribers" value={stats?.totalSubscribers} icon={<Users size={22} />} accent="cyan" />
        </div>

        {/* Recent Videos */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Recent Content</h3>
            <button onClick={() => navigate("/my-videos")} className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors group">
              View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideos.map(video => (
              <RecentVideoCard key={video._id} video={video} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* StatCard Component */
const StatCard = ({ label, value, icon, accent }) => {
  const themes = {
    indigo: "from-indigo-500/20 to-transparent text-indigo-400 border-indigo-500/20",
    blue: "from-blue-500/20 to-transparent text-blue-400 border-blue-500/20",
    cyan: "from-cyan-500/20 to-transparent text-cyan-400 border-cyan-500/20"
  };
  return (
    <div className="relative group bg-white/5 border border-white/10 rounded-[2rem] p-8 overflow-hidden transition-all hover:border-white/20">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${themes[accent]} blur-3xl opacity-20 -mr-16 -mt-16`} />
      <div className="relative flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-2xl bg-white/5 border ${themes[accent]} shadow-2xl`}>{icon}</div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</p>
          <h3 className="text-4xl font-black text-white tabular-nums">{value ?? 0}</h3>
        </div>
      </div>
    </div>
  );
};

/* Recent Video Card */
const RecentVideoCard = ({ video, navigate }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      onClick={() => navigate(`/watch/${video._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-500"
    >
      <div className="relative aspect-video bg-zinc-900 overflow-hidden">
        {hovered ? (
          <video 
            src={video.videoFile} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover" 
          />
        ) : (
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover opacity-80" 
          />
        )}
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-indigo-400 border border-white/10 flex items-center gap-1">
          <Eye size={10} /> {video.views?.toLocaleString() || 0}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-sm truncate group-hover:text-indigo-400 transition-colors">{video.title}</h4>
        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
          {new Date(video.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
