import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('token', 'your_generated_token')
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token)
            navigate('/')
        } catch (err) {
            setError('Invalid email or password');
            console.log('Login error:', err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
