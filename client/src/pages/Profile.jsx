 import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    user: null,
    posts: []
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const [userRes, postsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${id}`),
          axios.get(`http://localhost:5000/api/posts/user/${id}`)
        ]);

        setProfileData({
          user: userRes.data,
          posts: postsRes.data
        });
      } catch (error) {
        console.error("Profile load failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProfileData();
  }, [id]);

  if (isLoading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (!profileData.user) return <div style={{ padding: '20px' }}>User not found</div>;

  const { user, posts } = profileData;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #dbdbdb', paddingBottom: '30px' }}>
        <div style={{ marginRight: '40px' }}>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            background: '#efefef',
            backgroundImage: user.profilePic ? `url(${user.profilePic})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>
        
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '300', margin: '0 0 20px 0' }}>{user.username}</h2>
          
          <div style={{ display: 'flex', gap: '30px', fontSize: '16px' }}>
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>{user.followers?.length || 0}</strong> followers</span>
            <span><strong>{user.following?.length || 0}</strong> following</span>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <strong>{user.username}</strong>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {posts.map(post => (
          <div key={post._id} style={{ aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
            <img 
              src={post.image} 
              alt="" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;