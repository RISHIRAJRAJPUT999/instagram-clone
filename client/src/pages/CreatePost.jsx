import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const onShare = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please log in first");
    if (!imageUrl.trim()) return;

    setIsSharing(true);

    try {
      await axios.post("http://localhost:5000/api/posts", {
        image: imageUrl,
        caption,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sharing.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h2>New Post</h2>
        
        <form onSubmit={onShare} className="create-post-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Paste image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="create-post-input"
              autoFocus
            />
          </div>

          {imageUrl && (
            <div className="image-preview-container">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="image-preview"
                onError={(e) => e.target.style.display = 'none'} 
              />
            </div>
          )}

          <div className="form-group">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="create-post-textarea"
              rows={3}
            />
          </div>

          <button 
            type="submit" 
            className="create-post-button" 
            disabled={!imageUrl.trim() || isSharing}
          >
            {isSharing ? "Sharing..." : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;