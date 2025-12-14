import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import Post from "../components/Post.jsx";

const Home = () => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/posts/feed");
        setFeedPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    if (user) {
      getFeed();
    } else {
      setIsFetching(false);
    }
  }, [user]);

  if (isFetching) {
    return <div className="loading-feed">Loading feed...</div>;
  }

  return (
    <div className="home-container">
      <div className="feed">
        {feedPosts.length > 0 ? (
          feedPosts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="empty-feed-message">
            Your feed is empty. Follow some users to see their posts!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;