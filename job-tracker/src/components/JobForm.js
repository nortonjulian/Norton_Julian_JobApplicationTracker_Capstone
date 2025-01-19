import React, { useState } from 'react'

function JobForm({ onAddJob }) {
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const newJob = { title, company, description };
        onAddJob(newJob)

        setTitle('')
        setCompany('')
        setDescription('')
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a Job</h2>
            <div>
                <label>Job Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                  required
                />
            </div>
            <div>
                <label>Company:</label>
                <input
                  type="text"
                  value={company}
                  onChange={({ target }) => setCompany(target.value)}
                  required
                />
            </div>
            <div>
                <label>Descripton:</label>
                <textarea
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                  required
                />
            </div>
            <button type="submit">Add Job</button>
        </form>
    );
}

export default JobForm;
