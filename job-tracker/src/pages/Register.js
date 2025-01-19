import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/auth/register', {
            username,
            email,
            password
        });

            setSuccess('Registration successful! Please log in.');
            setError('');

            console.log('Registration successful:', response.data);
        } catch (err) {
            setError('Registration failed. Please try again.');

            if (err.response && err.response.data) {
                console.log('Registration error details:', err.response.data);
            } else {
                console.log('An unexpected error occurred:', err.message);
            }
        }
    };


    return (
        <div>
            <h2>Register</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
            <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter your username'
                  required
                />
                <br />
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <br />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
