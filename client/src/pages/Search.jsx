import { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    
    const { user: currentUser, setUser } = useContext(AuthContext);

    const onSearch = async (e) => {
        e.preventDefault();
        
        if (!query.trim()) return setResults([]);

        setIsSearching(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/search?username=${query}`);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const updateLocalUser = (newData) => {
        setUser(newData);
        localStorage.setItem('user', JSON.stringify(newData));
    };

    const toggleFollow = async (targetUserId, action) => {
        try {
            const endpoint = action === 'follow' ? 'follow' : 'unfollow';
            await axios.put(`http://localhost:5000/api/users/${endpoint}/${targetUserId}`);

            const currentFollowing = currentUser.following || [];
            
            let newFollowingList;
            if (action === 'follow') {
                newFollowingList = [...currentFollowing, targetUserId];
            } else {
                newFollowingList = currentFollowing.filter(id => id !== targetUserId);
            }

            updateLocalUser({ ...currentUser, following: newFollowingList });

        } catch (error) {
            alert(`Failed to ${action} user`);
        }
    };

    return (
        <div className="search-page">
            <div className="search-container">
                <h2>Find People</h2>
                
                <form onSubmit={onSearch} className="search-form">
                    <input 
                        type="text"
                        placeholder="Search users..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>

                {isSearching && <p className="search-loading">Loading...</p>}

                <div className="search-results">
                    {results.map(user => {
                        const isMe = currentUser && currentUser.id === user._id;
                        const isFollowing = (currentUser.following || []).includes(user._id);

                        return (
                            <div key={user._id} className="user-card">
                                <Link to={`/profile/${user._id}`} className="user-info">
                                    <div 
                                        className="user-avatar" 
                                        style={{ backgroundImage: `url(${user.profilePic || 'https://via.placeholder.com/40'})` }}
                                    />
                                    <span>@{user.username}</span>
                                </Link>

                                {!isMe && currentUser && (
                                    <button 
                                        onClick={() => toggleFollow(user._id, isFollowing ? 'unfollow' : 'follow')}
                                        className={`follow-button ${isFollowing ? 'unfollow' : ''}`}
                                    >
                                        {isFollowing ? 'Unfollow' : 'Follow'}
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    {!isSearching && results.length === 0 && query && (
                        <p className="no-results">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;