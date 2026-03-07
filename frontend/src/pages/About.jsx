import { 
  Monitor, Server, ShieldCheck, Zap, ArrowRight, 
  Sparkles, Layers, Code2, Cpu
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 selection:bg-indigo-500/30 pb-32 relative overflow-hidden font-sans">
      
      {/* --- FLUX BACKGROUND AMBIANCE --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.08)_0%,_transparent_60%)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.05)_0%,_transparent_60%)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* --- HERO SECTION: CLEAN & EDITORIAL --- */}
        <div className="mb-32 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[11px] font-bold uppercase tracking-wider mb-8">
            <Sparkles size={14} /> Engineering the Future
          </div>
          
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-white mb-8 leading-[1.1]">
            High-performance <br />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-slate-500">
                Streaming Architecture.
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            ProjectX is a precision-engineered video platform designed to deliver seamless 4K content. Built with the MERN stack and optimized for the modern web.
          </p>
        </div>

        {/* --- TECHNOLOGY BENTO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-40">
          
          {/* Frontend Card */}
          <div className="lg:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/5 p-10 md:p-14 hover:border-indigo-500/30 transition-all duration-500">
             <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                 <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 mb-8">
                    <Monitor size={24} />
                 </div>
                 <h3 className="text-3xl font-semibold text-white mb-4">Fluid User Interface</h3>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                    Crafted with React and Framer Motion for liquid-smooth navigation and high-fidelity video previews.
                 </p>
               </div>

               <div className="flex flex-wrap gap-3">
                  <TechBadge label="React 18" />
                  <TechBadge label="Tailwind CSS" />
                  <TechBadge label="Framer Motion" />
                  <TechBadge label="Responsive Engine" />
               </div>
             </div>
          </div>

          {/* Backend Card */}
          <div className="lg:col-span-5 group relative rounded-[2.5rem] overflow-hidden bg-white/[0.02] border border-white/5 p-10 md:p-14 hover:border-purple-500/30 transition-all duration-500">
             <div className="relative z-10 h-full flex flex-col justify-between">
               <div>
                 <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 mb-8">
                    <Server size={24} />
                 </div>
                 <h3 className="text-3xl font-semibold text-white mb-4">The Core</h3>
                 <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                    A robust Node.js environment managing secure authentication and complex data pipelines.
                 </p>
               </div>

               <div className="flex flex-wrap gap-3">
                  <TechBadge label="Node.js" />
                  <TechBadge label="Express" />
                  <TechBadge label="JWT" />
                  <TechBadge label="MongoDB" />
               </div>
            </div>
          </div>
        </div>

        {/* --- FEATURE HIGHLIGHTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40 px-4">
          <FeatureItem 
            icon={<ShieldCheck size={28} />} 
            title="Secure Access" 
            desc="Enterprise-grade protection using stateless JWT and secure cookie handling."
          />
          <FeatureItem 
            icon={<Zap size={28} />} 
            title="Fast Delivery" 
            desc="Cloudinary-powered asset optimization for instant loading across all devices."
          />
          <FeatureItem 
            icon={<Layers size={28} />} 
            title="Global Analytics" 
            desc="Real-time performance tracking for creators to monitor their audience growth."
          />
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="relative py-24 rounded-[3.5rem] overflow-hidden group text-center border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-semibold text-white mb-10 tracking-tight">
              Experience the <span className="text-slate-500">Difference.</span>
            </h2>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition-all shadow-xl"
            >
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const TechBadge = ({ label }) => (
  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
    {label}
  </span>
);

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left">
    <div className="text-indigo-500 mb-6">
      {icon}
    </div>
    <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
    <p className="text-slate-500 font-light leading-relaxed">{desc}</p>
  </div>
);

export default About;