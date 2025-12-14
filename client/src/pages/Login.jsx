 import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = "http://localhost:5000/api/auth/login";
      const res = await axios.post(endpoint, credentials);

      login(res.data.token, res.data.user);
      navigate("/");
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>InstaClone</h2>
        
        <form onSubmit={onLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleInput}
            required
            className="form-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInput}
            required
            className="form-input"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;