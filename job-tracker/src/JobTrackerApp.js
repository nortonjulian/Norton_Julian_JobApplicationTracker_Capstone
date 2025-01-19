import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header'
import JobList from './components/JobList'
import JobForm from './components/JobForm'
import Footer from './components/Footer'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001'

function JobTrackerApp() {
    const [jobs, setJobs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            axios
                .get(API_URL)
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setJobs(response.data);
                    } else {
                        console.error('API returned invalid data:', response.data);
                        setJobs([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching jobs:', error);
                    setErrorMessage('Failed to fetch jobs. Please try again later.');
                });
        }
    }, [isLoggedIn])

    const addJob = (newJob) => {
        axios.post('http://localhost:5001/api/jobs', newJob)
        .then((response) => setJobs((prevJobs) => [...prevJobs, response.data]))
        .catch((error) => console.log('Error adding job:', error))
    };

    if (!isLoggedIn) {
        return <p>Please log in to access Job Tracker.</p>
    }

    return (
        <>
          <Header/ >
          <main>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div div className='job-form container'>
            <JobForm onJobAdd={addJob} />
            </div>
            <div className='job-list container'>
            <JobList jobs={jobs} />
            </div>
          </main>
          <Footer />
        </>
    )
}

export default JobTrackerApp;
