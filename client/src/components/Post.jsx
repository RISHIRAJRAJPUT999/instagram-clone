import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import CommentList from './CommentList.jsx';
import AddComment from './AddComment.jsx';

const Icons = {
  Heart: ({ filled }) => (
    <svg aria-label={filled ? 'Unlike' : 'Like'} fill={filled ? '#ed4956' : '#262626'} height="24" viewBox="0 0 48 48" width="24">
      <path d="M34.6 3.9c-4.2 0-7.9 2.1-10.6 5.5C21.3 6 17.6 3.9 13.4 3.9 6.2 3.9 1 9.5 1 17.8c0 9.8 9.2 18.2 23 28.5 13.8-10.3 23-18.7 23-28.5 0-8.3-5.2-13.9-12.4-13.9z"></path>
    </svg>
  ),
  Comment: () => (
    <svg aria-label="Comment" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
      <path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24c0 4 1 7.8 2.8 11.1l-2.8 11c-.4 1.5.5 3 2 3h45c1.5 0 2.4-1.5 2-3zM24 38c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13zm-1.5-13.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5zm6 0c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5zm-12 0c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5z" fillRule="evenodd"></path>
    </svg>
  )
};

const Post = ({ post: initialData }) => {
  const [currentPost, setCurrentPost] = useState(initialData);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const { user } = useContext(AuthContext);

  if (!currentPost) return null;

  const hasUserLiked = user ? currentPost.likes.includes(user.id) : false;

  const onToggleLike = async () => {
    if (!user) {
      return alert("You need to be logged in to like posts!");
    }

    try {
      const previousLikes = [...currentPost.likes];
      const newLikesList = hasUserLiked 
        ? previousLikes.filter(id => id !== user.id)
        : [...previousLikes, user.id];

      setCurrentPost({ ...currentPost, likes: newLikesList });

      await axios.put(`http://localhost:5000/api/posts/like/${currentPost._id}`);
    } catch (error) {
      console.log("Like failed", error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        {currentPost.owner && (
          <Link to={`/profile/${currentPost.owner._id}`} className="username">
            {currentPost.owner.username}
          </Link>
        )}
      </div>

      <div className="post-image-container">
        <Link to={`/post/${currentPost._id}`}>
          <img 
            src={currentPost.image} 
            alt={currentPost.caption || "Post content"} 
            className="post-image" 
          />
        </Link>
      </div>

      <div className="post-actions">
        <button 
          onClick={onToggleLike} 
          className={`action-button like-button ${hasUserLiked ? 'liked' : ''}`}
        >
          <Icons.Heart filled={hasUserLiked} />
        </button>
        
        <button 
          onClick={() => setIsCommentSectionOpen(prev => !prev)} 
          className="action-button"
        >
          <Icons.Comment />
        </button>
      </div>

      <div className="likes-count">
        {currentPost.likes.length} {currentPost.likes.length === 1 ? 'like' : 'likes'}
      </div>

      <div className="post-caption">
        {currentPost.owner && (
          <Link to={`/profile/${currentPost.owner._id}`} className="username">
            {currentPost.owner.username}
          </Link>
        )}
        <span style={{ marginLeft: '5px' }}>{currentPost.caption}</span>
      </div>

      <button 
        onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)} 
        className="toggle-comments"
      >
        {isCommentSectionOpen 
          ? 'Hide comments' 
          : 'View all comments'
        }
      </button>

      {isCommentSectionOpen && (
        <div className="comments-section">
          <CommentList postId={currentPost._id} />
        </div>
      )}

      {user && (
        <AddComment 
          postId={currentPost._id} 
          onCommentAdded={() => alert("Comment added!")} 
        />
      )}
    </div>
  );
};

export default Post;