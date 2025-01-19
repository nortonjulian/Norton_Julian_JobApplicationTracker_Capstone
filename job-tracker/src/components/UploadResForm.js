import React, { useState } from 'react';
import { uploadResume } from '../utils/api';


const UploadResumeForm = ({ jobId }) => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await uploadResume(jobId, file);
            setMessage('Resume uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading resume: ' + error.response?.data?.error || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                required
            />
            <button type="submit">Upload Resume</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default UploadResumeForm;
