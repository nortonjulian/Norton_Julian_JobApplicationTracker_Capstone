import React from 'react';
import UploadResumeForm from './UploadResForm'; 

const JobDetails = ({ job }) => {
    return (
        <div>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.status}</p>
            {job.resume && (
                <a href={`/${job.resume}`} download>
                    Download Resume
                </a>
            )}
            <UploadResumeForm jobId={job.id} />
        </div>
    );
};

export default JobDetails;
