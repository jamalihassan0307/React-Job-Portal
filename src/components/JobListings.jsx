import React from "react";
import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = `https://676bcc0bbc36a202bb85bb5b.mockapi.io/api/jobs/Jobs${isHome ? '?limit=3' : ''}`;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isHome]);

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
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>

          {!isHome && (
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by job title..."
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                  value={searchTerm}
                  onChange={funSearch}
                />
              </div>
              <div className="md:w-1/4">
                <select
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-indigo-500"
                  value={jobType}
                  onChange={funTypeFilter}
                >
                  <option value="">All Types</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
          )}

          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <>
              {filteredJobs.length === 0 ? (
                <div className="text-center text-gray-600 py-8">
                  No jobs found matching your criteria
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(isHome ? jobs.slice(0, 3) : filteredJobs).map((job) => (
                    <JobListing key={job.id} job={job} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

const styles = {
  searchContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minWidth: '200px',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minWidth: '150px',
  },
};

export default JobListings;
