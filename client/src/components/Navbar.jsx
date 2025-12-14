import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          InstaClone
        </Link>
        
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/" className="navbar-link">
                Home
              </Link>
              <Link to="/search" className="navbar-link">
                Search
              </Link>
              <Link to="/create" className="navbar-link">
                Create Post
              </Link>
              <button onClick={onSignOut} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;