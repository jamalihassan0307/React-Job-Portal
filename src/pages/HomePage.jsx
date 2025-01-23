import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const funAddJobClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    
    if (user.role_id !== 1) {
      alert('Access Denied: Only administrators can add jobs');
      return;
    }
    
    navigate('/add-job');
  };

  return (
    <div>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
      <div className="user-controls" style={styles.controls}>
        <button 
          onClick={funAddJobClick} 
          style={{
            ...styles.button,
            display: user ? 'block' : 'none'
          }}
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default HomePage;
