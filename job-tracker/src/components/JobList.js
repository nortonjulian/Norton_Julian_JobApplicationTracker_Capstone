import React from 'react';
// import { uploadResume } from '../utils/api';

const JobList = ({ jobs = [] }) => {
    if (!Array.isArray(jobs)) {
      console.error("jobs is not an array", jobs);
      return <div>Something went wrong. No jobs available.</div>;
    }

    if (jobs.length === 0) {
      return <div>No jobs to display. Add your first job!</div>;
  }

    return (
      <div>
        {jobs.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    );
  };


export default JobList;
