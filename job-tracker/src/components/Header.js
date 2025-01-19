import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const isLoggedIn = localStorage.getItem('token') != null;
    const navigate = useNavigate()

    const hadnleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <header>
            <h1>Job Tracker</h1>
            <nav>
                {isLoggedIn ? (
                    <>
                    <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link> | <Link to='/'>Home</Link>
                    </>
                ) : (
                    <>
                    <Link to='/Home'>Home</Link> | <button onclick={hadnleLogout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;
