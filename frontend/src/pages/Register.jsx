import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    country: ""
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
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully");
        setUser({ email: "", password: "", name: "", country: "" });
        navigate("/login");
      } else {
        console.log(data.msg || "User already exists");
      }
    } catch (error) {
      console.log("Something went wrong! Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInput}
          required
        />
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInput}
          required
        />
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleInput}
          required
        />
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          name="country"
          placeholder="Country"
          value={user.country}
          onChange={handleInput}
          required
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
