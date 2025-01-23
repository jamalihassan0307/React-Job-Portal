import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://676bcc0bbc36a202bb85bb5b.mockapi.io/api/jobs/Jobs/${id}`);
        const jobData = response.data;
        
        // Transform the data to match our component structure
        const transformedJob = {
          id: jobData.id,
          title: jobData['job-listing-name'],
          type: jobData['job-type'],
          location: jobData.location,
          description: jobData.description,
          salary: jobData.salary,
          company: {
            name: jobData['company-name'],
            description: jobData['company-description'],
            contactEmail: jobData['contact-email'],
            contactPhone: jobData['contact-phone']
          }
        };
        
        setJob(transformedJob);
      } catch (error) {
        console.error('Error fetching job details:', error);
        toast.error('Error loading job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const funDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    
    if (user.role_id !== 1) {
      alert('Access Denied: Only administrators can delete jobs');
      return;
    }

    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        navigate('/jobs');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Render the entire manage section only for admin
  const renderManageSection = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role_id === 1) {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-bold mb-6">Manage Job</h3>
          <Link
            to={`/edit-job/${job.id}`}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
          >
            Edit Job
          </Link>
          <button
            onClick={() => funDelete(job.id)}
            className="bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
          >
            Delete Job
          </button>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <Spinner />;
  }

  if (!job) {
    return <div className="text-center mt-10">Job not found</div>;
  }

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            <aside>
              {/* Company Info */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">{job.company.name}</h2>
                <p className="my-2">{job.company.description}</p>
                <hr className="my-4" />
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>
                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              {/* Manage section - only visible to admin */}
              {renderManageSection()}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
