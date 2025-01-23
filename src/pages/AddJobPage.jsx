import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from '../components/JobForm';

const AddJobPage = ({ addJobSubmit }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role_id !== 1) {
      alert('You do not have permission to access this page');
      navigate('/');
      return;
    }
  }, [navigate]);

  const funAddJob = async (jobData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role_id !== 1) {
        alert('You do not have permission to add jobs');
        return;
      }
      await addJobSubmit(jobData);
      navigate('/jobs');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6">Add Job</h2>
        <JobForm onSubmit={funAddJob} />
      </div>
    </div>
  );
};

export default AddJobPage;
