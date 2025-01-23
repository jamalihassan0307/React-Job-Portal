import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobForm from '../components/JobForm';
import axios from 'axios';
import Spinner from '../components/Spinner';

const EditJobPage = ({ updateJobSubmit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role_id !== 1) {
      alert('Access Denied: Only administrators can edit jobs');
      navigate('/');
      return;
    }

    // Fetch job data
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`https://676bcc0bbc36a202bb85bb5b.mockapi.io/api/jobs/Jobs/${id}`);
        const data = response.data;
        
        // Transform API data to match form fields
        const transformedData = {
          title: data['job-listing-name'],
          type: data['job-type'],
          location: data.location,
          description: data.description,
          salary: data.salary,
          company: data['company-name'],
          companyDescription: data['company-description'],
          contactEmail: data['contact-email'],
          contactPhone: data['contact-phone']
        };
        
        setJobData(transformedData);
      } catch (error) {
        console.error('Error fetching job:', error);
        alert('Error loading job data');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id, navigate]);

  const funEditJob = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role_id !== 1) {
        alert('You do not have permission to edit jobs');
        return;
      }
      await updateJobSubmit(id, formData);
      navigate('/jobs');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update job');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6">Edit Job</h2>
        <JobForm onSubmit={funEditJob} initialData={jobData} />
      </div>
    </div>
  );
};

export default EditJobPage;
