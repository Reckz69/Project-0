import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // For those nice notifications
import MainLayout from "./layouts/mainLayout"; // Create this file (code below)
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import your new Register page
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore";
import UploadVideo from "./pages/UploadVideo";
import MyVideos from "./pages/MyVideo";
import WatchVideo from "./pages/WatchVideo";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Toaster allows your toast.success() calls to show up */}
        <Toaster position="bottom-right" reverseOrder={false} />
        
        <Routes>
          {/* Wrap all routes that need a Navbar in the MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Added this! */}
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/watch/:videoId" element={<WatchVideo/>}/>


            
            <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <UploadVideo />
                  </PrivateRoute>
                }
            />

            <Route
                path="/my-videos"
                element={
                  <PrivateRoute>
                    <MyVideos />
                  </PrivateRoute>
                }
            />




            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;