import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate is the new version of useHistory in React Router v6
import { fetchJobs } from '../utils/api'; // Import fetchJobs function to interact with the backend

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // useNavigate is used for navigation in React Router v6

  useEffect(() => {
    // Check if the user is logged in by verifying the token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchJobs() // Fetch jobs if the user is logged in
        .then((response) => {
          setJobs(response.data); // Store the fetched jobs in state
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error); // Handle errors (e.g., network or API issues)
        });
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page if the user is not logged in
  };

  const handleAddJobRedirect = () => {
    navigate('/add-job'); // Redirect to Add Job page when the user clicks 'Add a Job'
  };

  return (
    <div>
      <h1>Job Tracker</h1>
      {!isLoggedIn ? (
        <div>
          <p>You need to log in to see your jobs.</p>
          <button onClick={handleLoginRedirect}>Login</button>
        </div>
      ) : (
        <div>
          <button onClick={handleAddJobRedirect}>Add a Job</button>
          <form>
            <input type="text" placeholder="Job Title" />
            <input type="text" placeholder="Company" />
            <button type="submit">Add Job</button>
          </form>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id}>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
              </div>
            ))
          ) : (
            <p>Something went wrong. No jobs available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
