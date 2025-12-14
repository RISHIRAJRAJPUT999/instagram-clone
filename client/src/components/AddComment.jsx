import { useState } from 'react';
import axios from 'axios';

const AddComment = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const onPost = async (e) => {
    e.preventDefault();
    
    if (!comment.trim() || isPosting) return;

    setIsPosting(true);
    try {
      const endpoint = `http://localhost:5000/api/posts/comment/${postId}`;
      const res = await axios.post(endpoint, { text: comment });
      
      onCommentAdded(res.data);
      setComment('');
      
    } catch (error) {
      console.log(error);
      alert("Failed to post comment");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form onSubmit={onPost} className="comment-form" style={{ display: 'flex', alignItems: 'center', padding: '10px', borderTop: '1px solid #efefef' }}>
      <input 
        type="text" 
        placeholder="Add a comment..." 
        value={comment} 
        onChange={(e) => setComment(e.target.value)}
        style={{ 
          flex: 1, 
          border: 'none', 
          outline: 'none', 
          fontSize: '14px' 
        }}
      />
      
      <button 
        type="submit" 
        disabled={!comment.trim() || isPosting}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#0095f6', 
          fontWeight: '600', 
          cursor: 'pointer',
          fontSize: '14px',
          opacity: comment.trim() ? 1 : 0.3
        }}
      >
        Post
      </button>
    </form>
  );
};

export default AddComment;