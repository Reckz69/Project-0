import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, Loader2, ChevronRight, Fingerprint, Shield } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await loginUser({ email, password });
      const userData = res.data?.data?.user || res.data?.data;
      login(userData);
      toast.success(`Welcome back, ${userData.username}`);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Authentication failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] px-4 relative font-sans overflow-hidden">
      
      {/* --- ARTISTIC AMBIANCE (The "Cosmic" background) --- */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

      <div className="w-full max-w-[460px] z-10">
        
        {/* --- THE NEW ARTISTIC LOGO --- */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6">
            {/* The "Prism" Logo Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-2xl rotate-12 blur-lg opacity-40 animate-pulse" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
              <Fingerprint className="text-white w-8 h-8" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl font-light tracking-tight text-white flex items-center gap-1">
            Project <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">X</span>
          </h1>
          <p className="text-slate-500 text-xs tracking-[0.2em] uppercase mt-2 font-medium">Secure Biometric Access</p>
        </div>

        {/* --- GLASSMORPHIC CARD --- */}
        <div className="relative group">
          {/* Subtle Outer Border Glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[2.5rem] pointer-events-none" />
          
          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
            
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                </div>
                <div className="relative group/input">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/30 focus:bg-white/[0.07] text-slate-200 placeholder:text-slate-600 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                  <Link to="/forgot" className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot Access?</Link>
                </div>
                <div className="relative group/input">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/30 focus:bg-white/[0.07] text-slate-200 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-full py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 overflow-hidden">
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Sign in to Flux</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <div className="mt-10 text-center">
               <p className="text-xs text-slate-500">
                  New to ProjectX? <Link to="/register" className="text-white font-semibold hover:text-indigo-400 transition-colors ml-1">Create an account</Link>
               </p>
            </div>
          </div>
        </div>

        {/* --- FOOTER BADGE --- */}
        <div className="mt-10 flex flex-col items-center gap-3 opacity-30 group hover:opacity-60 transition-opacity duration-500">
           <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full">
              <Shield size={12} className="text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Quantum-level data encryption</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;