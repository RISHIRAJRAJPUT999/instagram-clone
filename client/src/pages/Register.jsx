import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegister = async (e) => {
    e.preventDefault();
    
    if(!username || !email || !password) return;

    setIsLoading(true);

    try {
      const url = "http://localhost:5000/api/auth/register";
      await axios.post(url, formData);
      
      alert("Account created! Please log in.");
      navigate("/login");

    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong during registration.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>InstaClone</h2>
        
        <form onSubmit={onRegister}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={onChange}
            className="form-input"
            autoComplete="off"
          />
          
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={onChange}
            className="form-input"
          />

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChange}
            className="form-input"
          />

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="redirect-text">
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;