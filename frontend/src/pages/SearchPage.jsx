import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { Play, User, Eye } from "lucide-react";
import { searchVideos } from "../api/video";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("query");
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                // 2. Use your Axios-linked function instead of fetch
                const response = await searchVideos(query);
                
                // Axios wraps data in a .data object
                if (response.data.success) {
                    setVideos(response.data.data);
                }
            } catch (err) {
                console.error("Search Page Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchResults();
    }, [query]);

    // Navigate to owner's public profile
    const handleOwnerClick = (e, username) => {
        e.preventDefault(); // Stop the event from bubbling up to the video Link
        e.stopPropagation();
        if (username) navigate(`/user/${username}`);
    };

    if (loading) return <div className="h-screen bg-[#030303] flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#030303] pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-8">
                    Results for: <span className="text-indigo-400">"{query}"</span>
                </h2>

                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {videos.map((videos) => {
                            // Determine if this item is a video or a creator profile
                            // This depends on the 'isOwnerMatch' flag from your backend
                            const isCreatorResult = videos.isOwnerMatch;

                            return (
                                <Link 
                                    key={videos._id} 
                                    to={isCreatorResult ? `/user/${videos.owner?.username}` : `/video/${videos._id}`}
                                    className="group flex flex-col gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 hover:bg-white/10 transition-all duration-300"
                                >
                                    {/* Thumbnail / Avatar Container */}
                                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                                        <img 
                                            src={isCreatorResult ? videos.owner?.avatar : videos.thumbnail} 
                                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isCreatorResult ? 'scale-75 rounded-full' : ''}`} 
                                            alt={videos.title || videos.owner?.username} 
                                        />
                                        {!isCreatorResult && (
                                            <>
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                                        <Play className="text-white fill-white ml-1" size={20} />
                                                    </div>
                                                </div>
                                                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-bold">
                                                    {Math.floor(videos.duration / 60)}:{(videos.duration % 60).toString().padStart(2, '0')}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Content Details */}
                                    <div className="flex flex-col gap-1 px-1">
                                        <h3 className="text-white font-semibold line-clamp-2 group-hover:text-indigo-400 transition-colors">
                                            {isCreatorResult ? videos.owner?.fullName : videos.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                                            <span 
                                                onClick={(e) => handleOwnerClick(e, videos.owner?.username)}
                                                className="flex items-center gap-1 hover:text-white transition cursor-pointer"
                                            >
                                                <User size={12}/> {videos.owner?.username || "Creator"}
                                            </span>
                                            {!isCreatorResult && (
                                                <>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1"><Eye size={12}/> {videos.views} views</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500">No results matched your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;