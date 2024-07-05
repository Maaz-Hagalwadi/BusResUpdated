// import { useState } from "react";
// import { backendUrl } from "../../../config";
// import { Link } from "react-router-dom";

// export const Forgot = () => {
//   const [data, setData] = useState({
//     email: "",
//   });
//   const [hold, setHold] = useState(false);
//   const handleChange = (ele) => {
//     const { name, value } = ele.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };
//   const handleSubmit = async (ele) => {
//     ele.preventDefault();
//     setHold(true);
//     const response = await fetch(`https://giridharan-5.onrender.com/forgotPassword`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.status === 401) {
//       alert("Invalid email");
//     } else {
//       setHold(false);
//       alert("Verify your email, please check your email");
//     }
//     setData({
//       email: "",
//     });
//   };
//   return (
//     <div style={{ backgroundColor: '#d1e0e0' }}>
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#3d5c5c' }}> {/* Changed bg-light to bg-primary for vibrant color */}
//                 <div className="container-fluid">
//                 <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>JourneyJet Bus Booking</h2>{/* Removed href from h2 */}
//                     <div className="ml-auto">
//                         <Link to='/login' className="btn btn-light">Log In</Link> {/* Added btn-outline-light class for light outline */}
//                         <Link to='/register' className="btn btn-light">Sign In</Link> {/* Changed button color to light */}
//                     </div>
//                 </div>
//             </nav>
//             <h1 className="lk" style={{ color: '#1f2e2e' }}>Welcome To JourneyJet</h1>
//       {/* Forgot Password Form */}
//       <div className="container">
//         <div className="row justify-content-center mt-5">
//           <div className="col-md-6">
//             <div className="card" style={{ backgroundColor: '#b3cccc' }}>
//               <div className="card-body">
//                 <h4 className="card-title text-center mb-4">Forgot Password Form</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email:</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       name="email"
//                       value={data.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="d-grid">
//                     <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Submit</button>
//                   </div>
//                 </form>
//                 {hold && <p className="text-center mt-3">Hold tight, we are sending email to you</p>}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import { useState } from "react";
// import { Link } from "react-router-dom";

// export const Forgot = () => {
//   const [data, setData] = useState({
//     email: "",
//   });
//   const [hold, setHold] = useState(false);

//   const handleChange = (ele) => {
//     const { name, value } = ele.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (ele) => {
//     ele.preventDefault();
//     setHold(true);
//     const response = await fetch(`https://giridharan-5.onrender.com/forgotPassword`, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.status === 401) {
//       alert("Invalid email");
//     } else {
//       setHold(false);
//       alert("Verify your email, please check your email");
//     }
//     setData({
//       email: "",
//     });
//   };

//   return (
//     <div style={{ backgroundColor: '#d1e0e0', minHeight: '100vh' }}>
//       {/* Header */}
//       <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#3d5c5c' }}>
//         <div className="container-fluid">
//           <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>JourneyJet Bus Booking</h2>
//           <div className="ml-auto">
//             <Link to='/login' className="btn btn-light">Log In</Link>
//             <Link to='/register' className="btn btn-light">Sign In</Link>
//           </div>
//         </div>
//       </nav>
//       <h1 className="text-center" style={{ color: '#1f2e2e', margin: '20px 0' }}>Welcome To JourneyJet</h1>
//       {/* Forgot Password Form */}
//       <div className="container">
//         <div className="row justify-content-center mt-5">
//           <div className="col-12 col-sm-8 col-md-6 col-lg-5">
//             <div className="card" style={{ backgroundColor: '#b3cccc' }}>
//               <div className="card-body">
//                 <h4 className="card-title text-center mb-4">Forgot Password Form</h4>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email:</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       name="email"
//                       value={data.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="d-grid">
//                     <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Submit</button>
//                   </div>
//                 </form>
//                 {hold && <p className="text-center mt-3">Hold tight, we are sending email to you</p>}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import { Link } from "react-router-dom";

export const Forgot = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [hold, setHold] = useState(false);

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (ele) => {
    ele.preventDefault();
    setHold(true);
    const response = await fetch(`https://giridharan-5.onrender.com/forgotPassword`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 401) {
      alert("Invalid email");
    } else {
      setHold(false);
      alert("Verify your email, please check your email");
    }
    setData({
      email: "",
    });
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: 'url("/highway.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="login-form-container">
        {/* Header */}
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#3d5c5c' }}>
          <div className="container-fluid">
            <h2 className="navbar-brand" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: '#141f1f' }}>JourneyJet Bus Booking</h2>
            <div className="ml-auto">
              <Link to='/login' className="btn btn-light" style={{margin:'10px'}}>Log In</Link>
              <Link to='/register' className="btn btn-light">Sign In</Link>
            </div>
          </div>
        </nav>
       
        {/* Forgot Password Form */}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card transparent-form">
                <h1 className="lk" style={{ color: '#1f2e2e' }}>Welcome To JourneyJet</h1>
                <div className="card-body">
                  <h4 className="card-title text-center mb-4">Forgot Password Form</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email">Email:</label>
                      <input type="email" className="form-control" id="email" name="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#1f2e2e', border: 'none' }}>Submit</button>
                    </div>
                  </form>
                  {hold && <p className="text-center mt-3">Hold tight, we are sending email to you</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
