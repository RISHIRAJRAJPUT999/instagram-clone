 import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post.jsx';

const PostPage = () => {
    const { id } = useParams();
    const [currentPost, setCurrentPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPostData = async () => {
            try {
                const endpoint = `http://localhost:5000/api/posts/${id}`;
                const { data } = await axios.get(endpoint);
                setCurrentPost(data);
            } catch (error) {
                console.log("Failed to load post", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) loadPostData();
    }, [id]);

    if (isLoading) return <div style={{ padding: '20px' }}>Loading...</div>;

    if (!currentPost) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Post not found</h2>
                <Link to="/">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="single-post-view">
            <div style={{ maxWidth: '600px', margin: '20px auto' }}>
                <Link to="/" style={{ display: 'inline-block', marginBottom: '15px', textDecoration: 'none', color: '#666' }}>
                    &larr; Back to feed
                </Link>
                
                <Post post={currentPost} />
            </div>
        </div>
    );
};

export default PostPage;