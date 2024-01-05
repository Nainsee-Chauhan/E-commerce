import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ onAuthentication }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // State for storing login status
  const [loginStatus, setLoginStatus] = useState("");

  // State for storing the authentication token
  const [authToken, setAuthToken] = useState("");

  // Handler for updating the username state
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handler for updating the password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handler for submitting the login form
  const handleLogin = async () => {
    if (username === "" || password === "") {
      alert("Empty fields, cannot login");
      return;
    }
    try {
      localStorage.setItem("loggedinUser", {"username": username, "password":password })
      // Dummy API endpoint for authentication (replace with your actual endpoint)
      const apiUrl = "https://dummyjson.com/auth/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "password":password }),
      });
      const response1 = await fetch("https://dummyjson.com/auth/RESOURCE", {
        method: "GET" /* or POST/PUT/PATCH/DELETE */,
        headers: {
          Authorization: `Bearer ${response.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(response1);

      // Assuming the API returns a JSON object with a 'status' and 'token' property
      const data = await response.json();
      console.log(data);
      if (data) {
        navigate("/home");
        setAuthToken(data.token);
        // console.log(data.token);
        // Store the token in local storage
        localStorage.setItem("authToken", data.token);

        // Update authentication status in the parent component
        onAuthentication(true);
      } else {
        // Update authentication status in the parent component
        onAuthentication(false);
      }

      // setLoginStatus(data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    // Check if there is an authentication token in local storage
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  return (
    <>
      <div className="c1">
        <h1>Login</h1>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="c2">
          <button onClick={handleLogin }>Login</button>
        </div>
        {loginStatus && <p>Login Status: {loginStatus}</p>}
      </div>
    </>
  );
};

export default Login;
