# Project X | Full-Stack Video Streaming Platform

![Version](https://img.shields.io/badge/version-1.0.0-indigo)
![License](https://img.shields.io/badge/license-MIT-blue)
![Maintained](https://img.shields.io/badge/maintained-yes-green)

Project X is a high-performance, scalable video streaming platform built with the MERN stack. It features an advanced search engine, real-time view tracking, and a professional-grade studio dashboard for creators.

---

## 🏗️ System Architecture & Workflow

Project X follows a decoupled client-server architecture with an emphasis on **Atomic Operations** and **Aggregation Pipelines** for data integrity.



### 🔄 The Video Streaming Workflow
1.  **Upload Phase:** Videos are processed via `Multer` and stored in Cloudinary. Metadata (Duration, Format, Title) is extracted and saved to MongoDB.
2.  **Search Phase:** A unified search controller uses MongoDB `$regex` and `$lookup` to search across both Video Titles and Creator Profiles simultaneously.
3.  **Playback & View Sync:** When a video is played, the frontend triggers an atomic `$inc` operation on the backend, ensuring views are counted uniquely per user.



---

## 🚀 Key Features

* **Dual-Core Search:** Find videos and creators in a single search bar with real-time dropdown suggestions.
* **Smart Theater:** High-end video player with auto-play, custom controls, and responsive layout.
* **Creator Studio:** Advanced dashboard for managing uploads, toggling public/private status, and tracking performance.
* **Public Profiles:** Dynamic creator pages allowing users to browse content from their favorite uploaders.
* **Secure Auth:** JWT-based authentication with Access and Refresh tokens stored in HTTP-only cookies.

---

## 🛠️ Tech Stack

### Frontend
* **React.js (Vite):** Fast, modern UI development.
* **Tailwind CSS:** Utility-first styling with custom "Prism" glassmorphism effects.
* **Framer Motion:** Smooth layout transitions and interactive animations.
* **Lucide React:** Beautiful, consistent iconography.

### Backend
* **Node.js & Express:** Robust server-side logic and RESTful API.
* **MongoDB & Mongoose:** NoSQL database with complex aggregation pipelines for data fetching.
* **Cloudinary:** Cloud storage for optimized video delivery and thumbnail generation.
* **Multer:** Middleware for handling `multipart/form-data` uploads.

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── controllers/   # Business logic (Video, User, Search)
│   │   ├── models/        # MongoDB Schemas (Video, User, View)
│   │   ├── routes/        # Express API endpoints
│   │   ├── middlewares/   # JWT Verify, Multer, Error handling
│   │   └── app.js         # Express configuration
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI elements (Navbar, Card)
│   │   ├── pages/         # SearchPage, WatchVideo, Dashboard
│   │   ├── context/      # AuthContext, ThemeContext
│   │   └── api/           # Axios instance and API calls
