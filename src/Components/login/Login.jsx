import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ onAuthentication }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // storing login status
  const [loginStatus, setLoginStatus] = useState("");

  //  storing the authentication token
  const [authToken, setAuthToken] = useState("");

  // updating the username state
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  //updating the password state
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // submitting the login form
  const handleLogin = async () => {
    if (username === "" || password === "") {
      alert("Empty fields, cannot login");
      return;
    }
    try {
      localStorage.setItem("loggedinUser", {
        username: username,
        password: password,
      });
      const apiUrl = "https://dummyjson.com/auth/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const response1 = await fetch("https://dummyjson.com/auth/RESOURCE", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${response.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(response1);

      const data = await response.json();
      console.log(data);
      if (data) {
        navigate("/home");
        setAuthToken(data.token);
        // console.log(data.token);
        localStorage.setItem("authToken", data.token);
        onAuthentication(true);
      } else {
        onAuthentication(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
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
          <button onClick={handleLogin}>Login</button>
        </div>
        {loginStatus && <p>Login Status: {loginStatus}</p>}
      </div>
    </>
  );
};

export default Login;
