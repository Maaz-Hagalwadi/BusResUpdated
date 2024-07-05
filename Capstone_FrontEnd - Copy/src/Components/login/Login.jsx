import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../../App.css';
// import './Login.css';

export const Login = ({ onLoginSuccess }) => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login data being sent:', login); // Debug log
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
            console.log('Login response status:', response.status); // Debug log
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || 'Login failed');
            }
            const userData = await response.json();
            console.log('User data received:', userData); // Debug log
            localStorage.setItem('user', JSON.stringify(userData)); // Store user data
            localStorage.setItem('email', login.email); // Store user email
            localStorage.setItem('password', login.password); // Store user password
            onLoginSuccess(userData.role); // Pass role to parent
            alert('Login success');
        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message);
            alert('Login failed: ' + error.message);
        } finally {
            setLogin({ email: '', password: '' });
        }
    };
    if (localStorage.getItem('user')) {
        return <Navigate to="/" replace />;
    }
    return (
        <div style={{
            backgroundImage: 'url("/highway.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            backgroundColor: '#D1E0E0',
        }}>
            <div className="background-container">
                <div className="login-form-container">
                    {/* Header */}
                    {/* <nav className="navbar navbar-expand-lg" variant="dark" style={{ width: '100%', backgroundColor: ' #334D4D', position: 'fixed', zIndex: '110', top: '0' }}>
                        <div className="container-fluid">
                            <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141F1F' }}>JourneyJet Bus Booking</h2>
                            <div className="ml-auto">
                                <Link to='/login' className="btn btn-light" style={{ marginRight: '10px' }}>Log In</Link>
                                <Link to='/register' className="btn btn-light">Sign In</Link>
                            </div>
                        </div>
                    </nav> */}
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">
                                <img src="\mybuslogo-removebg-preview.png" alt="JourneyJet Logo" width="30" height="30" className="d-inline-block align-text-top" />
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mx-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/" style={{ color: 'orange' }}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/destinations" style={{ color: 'orange' }}>Destinations</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/about" style={{ color: 'orange' }}>About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contact" style={{ color: 'orange' }}>Contact Us</Link>
                                    </li>
                                </ul>
                                <div className="ml-auto">
                                    <Link to='/login' className="btn btn-login" style={{ margin: '10px' }}>Log In</Link>
                                    <Link to='/register' className="btn btn-signin">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </nav>


                    {/* Login Form */}
                    <div className="container mt-5">
                        <div className="row justify-content-center" style={{ marginTop: '10px' }}>
                            <div className="col-md-4 d-flex justify-content-center align-items-center">
                                <img src="https://aathifpay.com/Content/HomeContentV3/images/busbooking.png" alt="Logo" className="img-fluid" />
                            </div>
                            <div className="col-md-6">
                                <div className="card transparent-form">
                                    <h1 className="lk" style={{ color: '#1F2E2E' }}>Welcome To JourneyJet</h1>
                                    <div className="card-body">
                                        {/* Login Form */}
                                        <h4 className="card-title text-center mb-4">Login In</h4>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="email">Email:</label>
                                                <input type="email" className="form-control" id="email" name="email" value={login.email} onChange={handleChange} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password">Password:</label>
                                                <input type="password" className="form-control" id="password" name="password" value={login.password} onChange={handleChange} required />
                                            </div>
                                            <div className="mb-3">
                                                <Link to='/forgot' style={{ color: '#1F2E2E' }}>Forgot Password?</Link>
                                                &nbsp;&nbsp;&nbsp;
                                                <Link to='/reset' style={{ color: '#1F2E2E' }}>Reset?</Link>
                                            </div>
                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1F2E2E', border: 'none' }}>Submit</button>
                                            </div>
                                            <div className="text-center mt-3">
                                                <Link to="/register" className="text-decoration-none" style={{ color: '#1F2E2E' }}>Register ? New account</Link>
                                            </div>
                                            {error && <div className="text-danger text-center mt-3">{error}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container text-center">
                        <span className="text-muted">© 2024 JourneyJet. All rights reserved.</span>
                        <div>
                            <a href="/about" className="text-decoration-none mx-2">About</a>
                            <a href="/contact" className="text-decoration-none mx-2">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
export default Login;