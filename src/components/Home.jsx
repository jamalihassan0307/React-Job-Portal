import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const funAddJob = () => {
    if (user?.role_id === 2) {
      alert('You do not have permission to add jobs');
      return;
    }
    // Add job logic here for admin
    alert('Add job functionality will be implemented here');
  };

  const funLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={funAddJob}>Add Job</button>
      <button onClick={funLogout}>Logout</button>
    </div>
  );
}

export default Home; 