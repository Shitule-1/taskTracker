import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log("Login successful");
        setUser({ email: "", password: "" });
navigate("/dashboard")

      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.log("Something went wrong during login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleInput}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleInput}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
