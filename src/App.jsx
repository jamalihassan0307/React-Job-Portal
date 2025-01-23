import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import ProfilePage from "./pages/ProfilePage";

const api_url = 'https://676bcc0bbc36a202bb85bb5b.mockapi.io/api/jobs';

const App = () => {
 
  

  const addJob = async (jobData) => {
    try {
      // Transform the data to match the API structure
      const formattedData = {
        'job-type': jobData.type,
        'job-listing-name': jobData.title,
        'description': jobData.description,
        'salary': jobData.salary,
        'location': jobData.location,
        'company-name': jobData.company,
        'company-description': jobData.companyDescription,
        'contact-email': jobData.contactEmail,
        'contact-phone': jobData.contactPhone
      };

      const response = await axios.post(`${api_url}/Jobs`, formattedData);
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding job:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to add job');
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      const formattedData = {
        'job-type': jobData.type,
        'job-listing-name': jobData.title,
        'description': jobData.description,
        'salary': jobData.salary,
        'location': jobData.location,
        'company-name': jobData.company,
        'company-description': jobData.companyDescription,
        'contact-email': jobData.contactEmail,
        'contact-phone': jobData.contactPhone
      };

      const response = await axios.put(`${api_url}/Jobs/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${api_url}/Jobs/${id}`);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };


  const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role_id !== 1) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/add-job" element={
            <ProtectedRoute>
              <AddJobPage addJobSubmit={addJob} />
            </ProtectedRoute>
          } />
          <Route
            path="/edit-job/:id"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <EditJobPage updateJobSubmit={updateJob} />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={<JobPage deleteJob={deleteJob} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
