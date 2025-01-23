import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const funAddJobClick = (e) => {
    if (!user || user.role_id !== 1) {
      e.preventDefault();
      alert('Access Denied: Only administrators can add jobs');
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          Job Board
        </Link>
        <div style={styles.links}>
          <Link to="/jobs" style={styles.link}>Jobs</Link>
          {user ? (
            <>
              <Link to="/profile" style={styles.link}>Profile</Link>
              <Link 
                to={user.role_id === 1 ? "/add-job" : "#"} 
                onClick={funAddJobClick}
                style={styles.link}
              >
                Add Job
              </Link>
            </>
          ) : (
            <Link to="/login" style={styles.link}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#808080',
    padding: '1rem 0',
    marginBottom: '2rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  brand: {
    color: 'YELOW',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#505050',
    },
  },
};

export default Navbar;
