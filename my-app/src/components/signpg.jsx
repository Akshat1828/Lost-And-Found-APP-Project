import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Prism from './Prism';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, phone, email, password }),
      });
      const result = await response.text();
      if (response.ok) {
        setMessage('Registration successful! Please login.');
      } else {
        setMessage(result || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <Prism
          animationType="hover"
          timeScale={0.5}
          height={2}
          baseWidth={2}
          scale={3.6}
          hueShift={0.2}
          colorFrequency={1}
          noise={0}
          glow={1.5}
        />
      </div>

      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>

          <div className="login-center">
            <h2>Hello There!</h2>
            <p>Let's help you get started</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
                required
              />

              <input
                type="email"
                placeholder="Tell us your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Make a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>

            {message && <p>{message}</p>}
          </div>

          <p className="login-bottom-p">
            Have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
