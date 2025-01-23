import { useState, useEffect } from "react";
import JobListing from "../components/JobListing";
import Spinner from "../components/Spinner";
import axios from "axios";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://676bcc0bbc36a202bb85bb5b.mockapi.io/api/jobs/Jobs');
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const nameMatch = job['job-listing-name']?.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = jobType === '' || job['job-type'] === jobType;
      return nameMatch && typeMatch;
    });
    setFilteredJobs(filtered);
  }, [searchTerm, jobType, jobs]);

  const funSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const funTypeFilter = (e) => {
    setJobType(e.target.value);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto py-10 px-6">
        <h1 className="text-3xl text-center font-bold text-indigo-600 mb-6">
          Browse Jobs
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by job title..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                value={searchTerm}
                onChange={funSearch}
              />
            </div>
            <div className="md:w-1/3">
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                value={jobType}
                onChange={funTypeFilter}
              >
                <option value="">All Job Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No jobs found matching your criteria</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsPage;