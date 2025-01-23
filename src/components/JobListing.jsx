import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarker } from "react-icons/fa";

const JobListing = ({ job }) => {
  useEffect(() => {
    console.log(job);
  }, [job]);
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>  <div className="mb-5">
          <h3 className="text-indigo-600 font-bold">Job name</h3>
          <div className="text-gray-600 flex items-center">
            {job["job-listing-name"]}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-indigo-600 font-bold">Location</h3>
          <div className="text-gray-600 flex items-center">
            <FaMapMarker className="text-lg mr-1" /> {job.location}
          </div>
        </div>
      

        <div className="mb-5">
          <h3 className="text-indigo-600 font-bold">Company</h3>
          <div className="text-gray-600">{job.company}</div>
        </div>

        <div className="mb-5">
          <h3 className="text-indigo-600 font-bold">Salary</h3>
          <div className="text-gray-600">{job.salary}</div>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex justify-between items-center">
          <Link
            to={`/jobs/${job.id}`}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
          >
            Read More
          </Link>
          <span className="text-gray-600">
            Posted: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
