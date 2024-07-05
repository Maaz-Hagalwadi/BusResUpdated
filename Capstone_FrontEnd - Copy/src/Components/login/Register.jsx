
// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import '../../App.css';

// const Register = () => {
//   const [data, setData] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//   });
//   const [otp, setOtp] = useState("");
//   const [registered, setRegistered] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleChange = (ele) => {
//     const { name, value } = ele.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleOtpChange = (ele) => {
//     const { value } = ele.target;
//     setOtp(value);
//   };

//   const handleRegisterSubmit = async (ele) => {
//     ele.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/register`, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 409) {
//         alert("User already exists");
//       } else {
//         alert("User registered successfully. Please check your email for the OTP.");
//         setRegistered(true);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error while registering");
//     }
//   };

//   const handleOtpSubmit = async (ele) => {
//     ele.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/verifyOtp`, {
//         method: "POST",
//         body: JSON.stringify({ email: data.email, otp }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 200) {
//         alert("OTP verified successfully. You can now log in.");
//         setLoggedIn(true);
//       } else {
//         alert("Invalid OTP. Please try again.");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error while verifying OTP");
//     }
//   };

//   if (loggedIn === true) {
//     return <Navigate to={'/login'} replace />;
//   }

//   if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
//     return <Navigate to={"/"} replace />;
//   }

//   return (
//     <div
//       style={{
//         backgroundImage: 'url("/highway.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#d1e0e0', // Fallback color if image fails to load
//       }}
//     >
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#3d5c5c' }}>
//         <div className="container-fluid">
//           <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>JourneyJet Bus Booking</h2>
//           <div className="ml-auto">
//             <Link to='/login' className="btn btn-light">Log In</Link>
//             <Link to='/register' className="btn btn-light">Sign Up</Link>
//           </div>
//         </div>
//       </nav>

      

//       {/* Split Page into Two Columns */}
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           {/* Left Column for Logo */}
//           <div className="col-md-4 d-flex justify-content-center align-items-center">
//             <img src="https://aathifpay.com/Content/HomeContentV3/images/busbooking.png" alt="Logo" className="img-fluid" style={{ maxHeight: '400px' }} />
//           </div>
//           {/* Right Column for Registration Form */}
//           <div className="col-md-6">
//             <div className="card transparent-form" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//               <div className="card-body">
//               <h1 className="text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Georgia, serif' }}>Welcome To JourneyJet</h1>
//                 <h4 className="card-title text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Sign Up</h4>
//                 {!registered ? (
//                   <form onSubmit={handleRegisterSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="userName" className="form-label">Name:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="userName"
//                         name="userName"
//                         value={data.userName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="email" className="form-label">Email:</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         name="email"
//                         value={data.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="password" className="form-label">Password:</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         name="password"
//                         value={data.password}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         value={data.phoneNumber}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Register</button>
//                     </div>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleOtpSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="otp" className="form-label">Enter OTP:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="otp"
//                         value={otp}
//                         onChange={handleOtpChange}
//                         required
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Verify OTP</button>
//                     </div>
//                   </form>
//                 )}
//                 <div className="text-center mt-3">
//                   <Link to="/login" className="text-decoration-none" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Already registered? Log In</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import '../../App.css';

// const Register = () => {
//   const [data, setData] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//   });
//   const [otp, setOtp] = useState("");
//   const [role, setRole] = useState("");
//   const [registered, setRegistered] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleChange = (ele) => {
//     const { name, value } = ele.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleOtpChange = (ele) => {
//     const { value } = ele.target;
//     setOtp(value);
//   };

//   const handleRoleChange = (ele) => {
//     const { value } = ele.target;
//     setRole(value);
//   };

//   const handleRegisterSubmit = async (ele) => {
//     ele.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/register`, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 409) {
//         alert("User already exists");
//       } else {
//         alert("User registered successfully. Please check your email for the OTP.");
//         setRegistered(true);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error while registering");
//     }
//   };

//   const handleOtpSubmit = async (ele) => {
//     ele.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/verifyOtp`, {
//         method: "POST",
//         body: JSON.stringify({ email: data.email, otp, role }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 200) {
//         alert("OTP verified successfully. You can now log in.");
//         setLoggedIn(true);
//       } else {
//         alert("Invalid OTP. Please try again.");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error while verifying OTP");
//     }
//   };

//   if (loggedIn === true) {
//     return <Navigate to={'/login'} replace />;
//   }

//   if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
//     return <Navigate to={"/"} replace />;
//   }

//   return (
//     <div
//       style={{
//         backgroundImage: 'url("/highway.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#d1e0e0', // Fallback color if image fails to load
//       }}
//     >
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#3d5c5c' }}>
//         <div className="container-fluid">
//           <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>JourneyJet Bus Booking</h2>
//           <div className="ml-auto">
//             <Link to='/login' className="btn btn-light">Log In</Link>
//             <Link to='/register' className="btn btn-light">Sign Up</Link>
//           </div>
//         </div>
//       </nav>

//       {/* Split Page into Two Columns */}
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           {/* Left Column for Logo */}
//           <div className="col-md-4 d-flex justify-content-center align-items-center">
//             <img src="https://aathifpay.com/Content/HomeContentV3/images/busbooking.png" alt="Logo" className="img-fluid" style={{ maxHeight: '400px' }} />
//           </div>
//           {/* Right Column for Registration Form */}
//           <div className="col-md-6">
//             <div className="card transparent-form" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//               <div className="card-body">
//                 <h1 className="text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Georgia, serif' }}>Welcome To JourneyJet</h1>
//                 <h4 className="card-title text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Sign Up</h4>
//                 {!registered ? (
//                   <form onSubmit={handleRegisterSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="userName" className="form-label">Name:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="userName"
//                         name="userName"
//                         value={data.userName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="email" className="form-label">Email:</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         name="email"
//                         value={data.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="password" className="form-label">Password:</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         name="password"
//                         value={data.password}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         value={data.phoneNumber}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Register</button>
//                     </div>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleOtpSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="otp" className="form-label">Enter OTP:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="otp"
//                         value={otp}
//                         onChange={handleOtpChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="role" className="form-label">Select Role:</label>
//                       <select
//                         className="form-control"
//                         id="role"
//                         value={role}
//                         onChange={handleRoleChange}
//                         required
//                       >
//                         <option value="" disabled>Select your role</option>
//                         <option value="user">User</option>
//                         <option value="admin">Admin</option>
//                       </select>
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Verify OTP</button>
//                     </div>
//                   </form>
//                 )}
//                 <div className="text-center mt-3">
//                   <Link to="/login" className="text-decoration-none" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Already registered? Log In</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import '../../App.css';

// const Register = () => {
//   const [data, setData] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
    
//   });
//   const [otp, setOtp] = useState("");
//   const [role, setRole] = useState("");
//   const [registered, setRegistered] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//   const handleChange = (ele) => {
//     const { name, value } = ele.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleOtpChange = (ele) => {
//     const { value } = ele.target;
//     setOtp(value);
//   };

//   const handleRoleChange = (ele) => {
//     const { value } = ele.target;
//     setRole(value);
//   };

//   const handleRegisterSubmit = async (ele) => {
//     ele.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/register`, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 409) {
//         alert("User already exists");
//       } else {
//         alert("User registered successfully. Please check your email for the OTP.");
//         setRegistered(true);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error while registering");
//     }
//   };

//   const handleOtpSubmit = async (ele) => {
//     ele.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3000/verifyOtp`, {
//         method: "POST",
//         body: JSON.stringify({ email: data.email, otp, role, age: data.age, gender: data.gender }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 200) {
//         alert("OTP verified successfully. You can now log in.");
//         setLoggedIn(true);
//       } else {
//         alert("Invalid OTP. Please try again.");
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error while verifying OTP");
//     }
//   };

//   if (loggedIn === true) {
//     return <Navigate to={'/login'} replace />;
//   }

//   if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
//     return <Navigate to={"/"} replace />;
//   }

//   return (
//     <div
//       style={{
//         backgroundImage: 'url("/highway.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#d1e0e0', // Fallback color if image fails to load
//       }}
//     >
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg " variant="dark" style={{  width: '100%', backgroundColor: ' #334d4d', position: 'fixed', zIndex: '110', top: '0' }}>
//         <div className="container-fluid">
//           <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>JourneyJet Bus Booking</h2>
//           <div className="ml-auto">
//             <Link to='/login' className="btn btn-light" style={{ marginRight: '10px' }}>Log In</Link>
//             <Link to='/register' className="btn btn-light">Sign Up</Link>
//           </div>
//         </div>
//       </nav>

//       {/* Split Page into Two Columns */}
//       <div className="container mt-5">
//         <div className="row justify-content-center" style={{ marginTop: '10px' }}>
//           {/* Left Column for Logo */}
//           <div className="col-md-4 d-flex justify-content-center align-items-center">
//             <img src="https://aathifpay.com/Content/HomeContentV3/images/busbooking.png" alt="Logo" className="img-fluid"  />
//           </div>
//           {/* Right Column for Registration Form */}
//           <div className="col-md-6">
//             <div className="card transparent-form" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//               <div className="card-body">
//                 <h1 className="text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Georgia, serif' }}>Welcome To JourneyJet</h1>
//                 <h4 className="card-title text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Sign Up</h4>
//                 {!registered ? (
//                   <form onSubmit={handleRegisterSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="userName" className="form-label">Name:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="userName"
//                         name="userName"
//                         value={data.userName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="email" className="form-label">Email:</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         id="email"
//                         name="email"
//                         value={data.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="password" className="form-label">Password:</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="password"
//                         name="password"
//                         value={data.password}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         value={data.phoneNumber}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
                    
                    
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Register</button>
//                     </div>
//                   </form>
//                 ) : (
//                   <form onSubmit={handleOtpSubmit}>
//                     <div className="mb-3">
//                       <label htmlFor="otp" className="form-label">Enter OTP:</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="otp"
//                         value={otp}
//                         onChange={handleOtpChange}
//                         required
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="role" className="form-label">Select Role:</label>
//                       <select
//                         className="form-control"
//                         id="role"
//                         value={role}
//                         onChange={handleRoleChange}
//                         required
//                       >
//                         <option value="" disabled>Select your role</option>
//                         <option value="user">User</option>
//                         <option value="admin">Admin</option>
//                       </select>
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="gender" className="form-label">Gender:</label>
//                       <select
//                         className="form-control"
//                         id="gender"
//                         name="gender"
//                         value={data.gender}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="" disabled>Select your gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="age" className="form-label">Age:</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         id="age"
//                         name="age"
//                         value={data.age}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="d-grid">
//                       <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Verify OTP</button>
//                     </div>
//                   </form>
//                 )}
//                 <div className="text-center mt-3">
//                   <Link to="/login" className="text-decoration-none" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Already registered? Log In</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import '../../App.css';

const Register = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [otpData, setOtpData] = useState({
    otp: "",
    role: "",
    age: "",
    gender: "",
  });
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleOtpChange = (ele) => {
    const { name, value } = ele.target;
    setOtpData({
      ...otpData,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async (ele) => {
    ele.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 409) {
        alert("User already exists");
      } else {
        alert("User registered successfully. Please check your email for the OTP.");
        setRegistered(true);
      }
    } catch (err) {
      console.log(err);
      alert("Error while registering");
    }
  };

  const handleOtpSubmit = async (ele) => {
    ele.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/register/verifyOtp`, {
        method: "POST",
        body: JSON.stringify({ email: data.email, ...otpData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("OTP verified successfully. You can now log in.");
        setLoggedIn(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.log(err);
      alert("Error while verifying OTP");
    }
  };

  if (loggedIn) {
    return <Navigate to={'/login'} replace />;
  }

  if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/highway.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        backgroundColor: '#d1e0e0', // Fallback color if image fails to load
      }}
    >
      {/* Header */}
      <nav className="navbar navbar-expand-lg " variant="dark" style={{  width: '100%', backgroundColor: ' #334d4d', position: 'fixed', zIndex: '110', top: '0' }}>
        <div className="container-fluid">
          <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>JourneyJet Bus Booking</h2>
          <div className="ml-auto">
            <Link to='/login' className="btn btn-light" style={{ marginRight: '10px' }}>Log In</Link>
            <Link to='/register' className="btn btn-light">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Split Page into Two Columns */}
      <div className="container mt-5">
        <div className="row justify-content-center" style={{ marginTop: '10px' }}>
          {/* Left Column for Logo */}
          <div className="col-md-4 d-flex justify-content-center align-items-center">
                  </div>
          {/* Right Column for Registration Form */}
          <div className="col-md-6">
            <div className="card transparent-form" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <div className="card-body">
                <h1 className="text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Georgia, serif' }}>Welcome To JourneyJet</h1>
                <h4 className="card-title text-center mb-4" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Sign Up</h4>
                {!registered ? (
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="mb-3">
                      <label htmlFor="userName" className="form-label">Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        value={data.userName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Register</button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleOtpSubmit}>
                    <div className="mb-3">
                      <label htmlFor="otp" className="form-label">Enter OTP:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="otp"
                        name="otp"
                        value={otpData.otp}
                        onChange={handleOtpChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">Select Role:</label>
                      <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={otpData.role}
                        onChange={handleOtpChange}
                        required
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Gender:</label>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={otpData.gender}
                        onChange={handleOtpChange}
                        required
                      >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">Age:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={otpData.age}
                        onChange={handleOtpChange}
                        required
                      />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Verify OTP</button>
                    </div>
                  </form>
                )}
                <div className="text-center mt-3">
                  <Link to="/login" className="text-decoration-none" style={{ color: '#1f2e2e', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Already registered? Log In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
