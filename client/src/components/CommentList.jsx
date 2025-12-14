import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const getData = async () => {
      try {
        const endpoint = `http://localhost:5000/api/posts/comments/${postId}`;
        const { data } = await axios.get(endpoint);
        setList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [postId]);

  if (isFetching) {
    return <div style={{ padding: '10px', color: '#8e8e8e', fontSize: '14px' }}>Loading...</div>;
  }

  if (list.length === 0) {
    return <div style={{ padding: '10px', color: '#8e8e8e', fontSize: '14px' }}>No comments yet.</div>;
  }

  return (
    <div className="comments-wrapper" style={{ padding: '5px 10px' }}>
      {list.map((item) => (
        <div key={item._id} className="comment-item" style={{ marginBottom: '6px', fontSize: '14px' }}>
          <Link 
            to={`/profile/${item.owner?._id}`} 
            style={{ fontWeight: '600', marginRight: '6px', textDecoration: 'none', color: '#262626' }}
          >
            {item.owner?.username || 'User'}
          </Link>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;