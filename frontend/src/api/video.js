import axios from "./axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
  });


export const uploadVideo = (formData, onProgress) =>
  API.post("/videos/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress(percent);
      }
    },
  });



  export const getMyVideos = async () => {
    const res = await axios.get("/videos/", {
      params: {
        userId: "me" // backend should map this to req.user._id
      }
    });
  
    return res.data.data.docs; // aggregatePaginate result
  };


export const deleteVideo = (videoId) =>
  API.delete(`/videos/${videoId}`);

export const togglePublish = (videoId) =>
  API.patch(`/videos/toggle/${videoId}`);

export const getVideoViews = (videoId) =>
  API.patch(`/videos/views/${videoId}`);

export const searchVideos = (query) =>
  API.get(`/videos/search?query=${query}`);