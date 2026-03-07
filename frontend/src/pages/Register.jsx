import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.js";
import { 
  UserPlus, Mail, Lock, User, 
  Loader2, ChevronRight, Camera, 
  ShieldCheck, Fingerprint
} from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", username: "", email: "", password: "" });
  const [avataar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (avataar) data.append("avataar", avataar);

    try {
      await registerUser(data);
      toast.success("Account created successfully. Welcome!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 flex items-center justify-center px-4 py-20 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* --- FLUX BACKGROUND AMBIANCE --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[520px] z-10 relative">
        
        {/* --- BRAND HEADER: FLUX PRISM LOGO --- */}
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="relative mb-8 group">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
              <Fingerprint className="text-white w-8 h-8" strokeWidth={1.5} />
            </div>
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create your account</h1>
          <p className="text-slate-500 text-sm font-light">Join the community and start sharing your videos.</p>
        </div>

        {/* --- REGISTER CARD --- */}
        <div className="relative">
          <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* --- AVATAR UPLOAD --- */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-500/50">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-slate-600" />
                    )}
                    <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Camera size={20} className="text-white" />
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full text-white shadow-lg border-2 border-[#111111]">
                    <UserPlus size={14} />
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-500 mt-3 uppercase tracking-wider">Profile Photo</span>
              </div>

              {/* --- INPUT FIELDS --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CleanInput 
                  label="Full Name" 
                  placeholder="John Doe" 
                  icon={<User size={18}/>} 
                  onChange={(val) => setFormData({...formData, fullName: val})} 
                />
                <CleanInput 
                  label="Username" 
                  placeholder="johndoe" 
                  icon={<Fingerprint size={18}/>} 
                  onChange={(val) => setFormData({...formData, username: val})} 
                />
              </div>

              <CleanInput 
                label="Email Address" 
                placeholder="name@example.com" 
                icon={<Mail size={18}/>} 
                type="email" 
                onChange={(val) => setFormData({...formData, email: val})} 
              />
              <CleanInput 
                label="Password" 
                placeholder="••••••••" 
                icon={<Lock size={18}/>} 
                type="password" 
                onChange={(val) => setFormData({...formData, password: val})} 
              />

              {/* --- SUBMIT BUTTON --- */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group mt-4"
              >
                <div className="absolute inset-0 bg-indigo-600 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-full py-4 bg-white text-black hover:bg-slate-200 disabled:opacity-50 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Get Started</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* --- FOOTER --- */}
            <div className="mt-10 pt-6 border-t border-white/5 text-center">
              <p className="text-sm text-slate-500 font-light">
                Already have an account? <Link to="/login" className="text-white font-medium hover:text-indigo-400 transition-colors">Sign in</Link>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECURITY FOOTER --- */}
        <div className="mt-8 flex justify-center items-center gap-2 opacity-40">
           <ShieldCheck size={14} className="text-slate-400" />
           <span className="text-xs font-medium text-slate-400 tracking-tight">Secure, encrypted connection active</span>
        </div>
      </div>
    </div>
  );
};

/* --- REFINED INPUT COMPONENT --- */
const CleanInput = ({ label, placeholder, icon, type = "text", onChange }) => (
  <div className="space-y-2">
    <label className="text-xs font-medium text-slate-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500/30 focus:ring-1 focus:ring-indigo-500/20 text-slate-200 placeholder:text-slate-700 transition-all text-sm"
        required
      />
    </div>
  </div>
);

export default Register;