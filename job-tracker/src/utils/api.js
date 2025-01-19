import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5001',
});

// Attach token to each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle errors in the request
    }
);

// Export functions for API calls
export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (userData) => api.post('/login', userData);
export const fetchJobs = () => api.get('/jobs');
export const addJob = (jobData) => api.post('/jobs', jobData);
export const updateJob = (id, jobData) => api.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

// New: Upload Resume
export const uploadResume = (jobId, file) => {
    const formData = new FormData();
    formData.append('resume', file);

    return api.post(`/jobs/${jobId}/upload-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
