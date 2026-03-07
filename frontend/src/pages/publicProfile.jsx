// Inside your Profile/Dashboard Page
const ProfilePage = () => {
    const { username } = useParams(); // From URL
    const { user: loggedInUser } = useAuth(); // From AuthContext
    const [profileData, setProfileData] = useState(null);
  
    // Check if the current viewer is the owner
    const isAdmin = loggedInUser?.username === username;
  
    return (
      <div className="bg-[#050505] min-h-screen text-white">
        {/* Header section */}
        <div className="p-10 border-b border-white/5">
           <img src={profileData?.avatar} className="w-24 h-24 rounded-full" />
           <h1 className="text-3xl font-bold">{profileData?.fullName}</h1>
           
           {/* THE CORE CONCEPT: Hiding buttons from other users */}
           {isAdmin && (
             <div className="mt-4 flex gap-4">
                <button className="px-6 py-2 bg-indigo-600 rounded-xl">Edit Profile</button>
                <button className="px-6 py-2 bg-white text-black rounded-xl">Upload Video</button>
             </div>
           )}
        </div>
  
        {/* Video Grid - Visible to everyone */}
        <div className="grid grid-cols-3 gap-6 p-10">
            {profileData?.videos.map(v => <VideoCard key={v._id} video={v} />)}
        </div>
      </div>
    );
  };
  
  export default ProfilePage;