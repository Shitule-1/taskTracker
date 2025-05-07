import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:3000/curloginuser', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log("Response:", data.data.name);

        if (res.ok && (data.success === undefined || data.success === true)) {
          setUsername(data.data.name || 'User');
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1> <u>Dashboard</u></h1>
      <h2>Welcome , {username}</h2>

      <div style={{ marginTop: "20px" }}>
        <Link to="/task">
          <button style={{ marginRight: "10px", padding: "8px" }}>Create Project</button>
        </Link>
        <Link to="/task">
          <button style={{ padding: "8px" }}>See All Tasks</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
