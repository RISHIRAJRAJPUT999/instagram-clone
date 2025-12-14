import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Search from "./pages/Search.jsx";
import Profile from "./pages/Profile.jsx";
import PostPage from "./pages/PostPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        
        <div className="app-layout">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<CreatePost />} />
            
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post/:id" element={<PostPage />} />

            <Route path="*" element={<div style={{ textAlign: "center", marginTop: "50px" }}>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;