import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo as uploadVideoApi } from "../api/video";
import { Upload, Film, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";

const UploadVideo = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!videoFile || !thumbnail || !title || !description) {
      return alert("Please fill all fields and upload files.");
    }

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    setUploading(true);
    try {
      await uploadVideoApi(formData, setProgress);
      navigate("/dashboard");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex items-center justify-center p-6 selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="fixed top-0 -left-4 w-72 h-72 bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 -right-4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-2xl bg-[#0F0F12] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
            Upload Content
          </h2>
          <p className="text-slate-500 mt-2">Share your story with the world.</p>
        </div>

        <div className="space-y-8">
          {/* Text Inputs Section */}
          <div className="grid gap-5">
            <div className="group">
              <label className="text-xs font-medium text-slate-500 ml-1 uppercase tracking-widest">Video Title</label>
              <input
                type="text"
                placeholder="Give it a catchy name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all outline-none placeholder:text-slate-600"
              />
            </div>

            <div className="group">
              <label className="text-xs font-medium text-slate-500 ml-1 uppercase tracking-widest">Description</label>
              <textarea
                placeholder="What is this video about?"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all outline-none resize-none placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video Dropzone */}
            <FileDropzone 
              file={videoFile} 
              setFile={setVideoFile} 
              icon={<Film size={20}/>} 
              label="Video File" 
              accept="video/*, .mkv,  video/x-matroska" 
            />
            {/* Thumbnail Dropzone */}
            <FileDropzone 
              file={thumbnail} 
              setFile={setThumbnail} 
              icon={<ImageIcon size={20}/>} 
              label="Thumbnail" 
              accept="image/*" 
            />
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-indigo-400 animate-pulse">Uploading to Cloud...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.5)]" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span>Publish Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Dropzone Component for God-Level Cleanliness
const FileDropzone = ({ file, setFile, icon, label, accept }) => {
  const inputRef = useRef(null);

  return (
    <div 
      onClick={() => inputRef.current.click()}
      className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center gap-3
        ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'}`}
    >
      <input 
        type="file" 
        ref={inputRef} 
        onChange={(e) => setFile(e.target.files[0])} 
        accept={accept} 
        className="hidden" 
      />
      
      <div className={`${file ? 'text-emerald-400' : 'text-slate-400 group-hover:text-indigo-400'} transition-colors`}>
        {file ? <CheckCircle2 size={32} /> : icon}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold">{file ? "File Selected" : `Add ${label}`}</p>
        <p className="text-[10px] text-slate-500 mt-1 truncate max-w-[140px]">
          {file ? file.name : `Click to browse`}
        </p>
      </div>

      {file && (
        <button 
          onClick={(e) => { e.stopPropagation(); setFile(null); }}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default UploadVideo;