

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../BusDetails.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const BusDetails = () => {
//   const location = useLocation();
//   const busId = location.state?.busId;
//   const navigate = useNavigate();

//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);

//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(response.data);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   const handleSeatSelection = (seat) => {
//     setSelectedSeats((prevSelectedSeats) => {
//       if (prevSelectedSeats.includes(seat)) {
//         return prevSelectedSeats.filter((s) => s !== seat);
//       } else {
//         return [...prevSelectedSeats, seat];
//       }
//     });
//   };

//   const cartSubtotal = selectedSeats.length * bus?.fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     // Navigate to Billing page with booking details
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal
//     };

//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const halfCapacity = Math.ceil(bus.capacity / 2);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Half</h6>
//               <div className="seat-selection">
//                 {[...Array(halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
// //                     className={`btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'} m-1`}
// // style={{ borderColor: '#3d5c5c', color: '#3d5c5c' }}
// className={`btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'} m-1`}
// style={{ borderColor: '#3d5c5c', color: selectedSeats.includes(seat) ? '#fff' : '#3d5c5c' }}


//                     onClick={() => handleSeatSelection(seat)}
//                     disabled={selectedSeats.includes(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper Half</h6>
//               <div className="seat-selection">
//                 {[...Array(bus.capacity - halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + halfCapacity}
//                     className={`btn ${selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     style={{ borderColor: '#3d5c5c', color: '#3d5c5c' }}
                    
//                     onClick={() => handleSeatSelection(seat + halfCapacity)}
//                     disabled={selectedSeats.includes(seat + halfCapacity)}
//                   >
//                     {seat + 1 + halfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">Discount (%)</label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
         

          
//         </div>
//         <div className="col-md-6">
//   <div className="card mb-4">
//     <div className="card-body">
//       <h5 className="card-title">{bus.busName}</h5>
//       <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
      
//       <table className="table table-bordered">
//         <tbody>
//           <tr>
//             <td>From - To</td>
//             <td>{bus.Route.from} - {bus.Route.to}</td>
//           </tr>
//           <tr>
//             <td>Bus Type</td>
//             <td>{bus.busType}</td>
//           </tr>
//           <tr>
//             <td>Departure</td>
//             <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//           </tr>
//           <tr>
//             <td>Arrival</td>
//             <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//           </tr>
//           <tr>
//             <td>Fare</td>
//             <td>₹ {bus.fare.toLocaleString()}</td>
//           </tr>
//           <tr>
//             <td>Remaining Capacity</td>
//             <td>{bus.capacity - selectedSeats.length}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">Number of Passengers</label>
//             <input
//               type="number"
//               id="numPassengers"
//               className="form-control"
//               value={numPassengers}
//               readOnly
//             />
//           </div>
         

//           <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={handleBooking}>Confirm Booking</button>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default BusDetails;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../BusDetails.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare } = location.state || {};
//   const navigate = useNavigate();

//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);

//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(response.data);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   const handleSeatSelection = (seat) => {
//     setSelectedSeats((prevSelectedSeats) => {
//       if (prevSelectedSeats.includes(seat)) {
//         return prevSelectedSeats.filter((s) => s !== seat);
//       } else {
//         return [...prevSelectedSeats, seat];
//       }
//     });
//   };

//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     // Navigate to Billing page with booking details
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal
//     };

//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const halfCapacity = Math.ceil(bus.capacity / 2);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Half</h6>
//               <div className="seat-selection">
//                 {[...Array(halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat)}
//                     disabled={selectedSeats.includes(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper Half</h6>
//               <div className="seat-selection">
//                 {[...Array(bus.capacity - halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + halfCapacity}
//                     className={`btn ${selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat + halfCapacity)}
//                     disabled={selectedSeats.includes(seat + halfCapacity)}
//                   >
//                     {seat + 1 + halfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">Discount (%)</label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={handleBooking}>Confirm Booking</button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>{from} - {to}</td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">Number of Passengers</label>
//             <input
//               type="number"
//               id="numPassengers"
//               className="form-control"
//               value={numPassengers}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusDetails;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../BusDetails.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare } = location.state || {};
//   const navigate = useNavigate();

//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);

//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(response.data);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   const handleSeatSelection = (seat) => {
//     setSelectedSeats((prevSelectedSeats) => {
//       if (prevSelectedSeats.includes(seat)) {
//         return prevSelectedSeats.filter((s) => s !== seat);
//       } else {
//         return [...prevSelectedSeats, seat];
//       }
//     });
//   };

//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     // Navigate to Billing page with booking details
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//     };

//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const halfCapacity = Math.ceil(bus.capacity / 2);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Half</h6>
//               <div className="seat-selection">
//                 {[...Array(halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper Half</h6>
//               <div className="seat-selection">
//                 {[...Array(bus.capacity - halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + halfCapacity}
//                     className={`btn ${selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat + halfCapacity)}
//                   >
//                     {seat + 1 + halfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">Discount (%)</label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={handleBooking}>Confirm Booking</button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>{from} - {to}</td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
                 
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">Number of Passengers</label>
//             <input
//               type="number"
//               id="numPassengers"
//               className="form-control"
//               value={numPassengers}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusDetails;
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../BusDetails.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare, date } = location.state || {};
//   const navigate = useNavigate();

//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);

//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(response.data);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   const handleSeatSelection = (seat) => {
//     setSelectedSeats((prevSelectedSeats) => {
//       if (prevSelectedSeats.includes(seat)) {
//         return prevSelectedSeats.filter((s) => s !== seat);
//       } else {
//         return [...prevSelectedSeats, seat];
//       }
//     });
//   };

//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     // Navigate to Billing page with booking details
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//       date  // Include date in the booking details
//     };

//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const halfCapacity = Math.ceil(bus.capacity / 2);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Half</h6>
//               <div className="seat-selection">
//                 {[...Array(halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper Half</h6>
//               <div className="seat-selection">
//                 {[...Array(bus.capacity - halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + halfCapacity}
//                     className={`btn ${selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat + halfCapacity)}
//                   >
//                     {seat + 1 + halfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">Discount (%)</label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={handleBooking}>Confirm Booking</button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>{from} - {to}</td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Date</td>
//                     <td>{new Date(date).toLocaleDateString()}</td> {/* Format date */}
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">Number of Passengers</label>
//             <input
//               type="number"
//               id="numPassengers"
//               className="form-control"
//               value={numPassengers}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusDetails;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../BusDetails.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare, date } = location.state || {};
//   const navigate = useNavigate();

//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);

//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(response.data);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   const handleSeatSelection = (seat) => {
//     setSelectedSeats((prevSelectedSeats) => {
//       if (prevSelectedSeats.includes(seat)) {
//         return prevSelectedSeats.filter((s) => s !== seat);
//       } else {
//         return [...prevSelectedSeats, seat];
//       }
//     });
//   };

//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     // Navigate to Billing page with booking details
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//       bookingDate: date,  // Include date in the booking details
//     };

//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const halfCapacity = Math.ceil(bus.capacity / 2);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Half</h6>
//               <div className="seat-selection">
//                 {[...Array(halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper Half</h6>
//               <div className="seat-selection">
//                 {[...Array(bus.capacity - halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + halfCapacity}
//                     className={`btn ${selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary'} m-1`}
//                     onClick={() => handleSeatSelection(seat + halfCapacity)}
//                   >
//                     {seat + 1 + halfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">Discount (%)</label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={handleBooking}>Confirm Booking</button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>{from} - {to}</td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Date</td>
//                     <td>{new Date(date).toLocaleDateString()}</td> {/* Format date */}
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">Number of Passengers</label>
//             <input
//               type="number"
//               id="numPassengers"
//               className="form-control"
//               value={numPassengers}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusDetails;
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../BusDetails.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000';

// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare, date } = location.state || {};
//   const navigate = useNavigate();

//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [seatDetails, setSeatDetails] = useState([]);

//   // Function to fetch bus details including seat details
//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Fetch bus details
//       const busResponse = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(busResponse.data);

//       // Fetch seat details
//       const seatResponse = await axios.get(`${API_URL}/seat/seats/${busId}`);
//       const seats = seatResponse.data || []; // Assuming seatResponse.data is an array of seat details
//       setSeatDetails(seats); // Set seat details state
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   // Function to check if a seat should be blocked
//   const checkSeatAvailability = (seat) => {
//     // Ensure seatDetails is defined and has data before using some
//     if (!seatDetails || seatDetails.length === 0) {
//       return true; // Return true by default if seatDetails is not available
//     }

//     // Implement your logic here based on seatDetails and conditions
//     const isBlocked = seatDetails.some((seatDetail) => {
//       return (
//         seatDetail.from === from &&
//         seatDetail.to === to &&
//         seatDetail.selectedSeats.includes(seat.toString()) && // Convert seat to string for comparison
//         new Date(seatDetail.bookingDate).toLocaleDateString() === new Date(date).toLocaleDateString()
//       );
//     });

//     return !isBlocked; // Return true if seat should not be blocked
//   };

//   const handleSeatSelection = (seat) => {
//     if (checkSeatAvailability(seat)) {
//       setSelectedSeats((prevSelectedSeats) => {
//         if (prevSelectedSeats.includes(seat)) {
//           return prevSelectedSeats.filter((s) => s !== seat);
//         } else {
//           return [...prevSelectedSeats, seat];
//         }
//       });
//     } else {
//       // Handle case where seat should be blocked (optional)
//       alert('This seat is already booked for the selected journey.');
//     }
//   };

//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     // Navigate to Billing page with booking details
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//       bookingDate: date,  // Include date in the booking details
//     };

//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const halfCapacity = Math.ceil(bus.capacity / 2);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Half</h6>
//               <div className="seat-selection">
//                 {[...Array(halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${!checkSeatAvailability(seat) ? 'btn-danger' : (selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary')} m-1`}
//                     disabled={!checkSeatAvailability(seat)}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper Half</h6>
//               <div className="seat-selection">
//                 {[...Array(bus.capacity - halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + halfCapacity}
//                     className={`btn ${!checkSeatAvailability(seat + halfCapacity) ? 'btn-danger' : (selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary')} m-1`}
//                     disabled={!checkSeatAvailability(seat + halfCapacity)}
//                     onClick={() => handleSeatSelection(seat + halfCapacity)}
//                   >
//                     {seat + 1 + halfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">Discount (%)</label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={handleBooking}>Confirm Booking</button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>{from} - {to}</td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Date</td>
//                     <td>{new Date(date).toLocaleDateString()}</td> {/* Format date */}
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">Number of Passengers</label>
//             <input
//               type="number"
//               id="numPassengers"
//               className="form-control"
//               value={numPassengers}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusDetails;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import './BusDetails.css'; // Custom CSS for additional styling
// const API_URL = 'http://localhost:3000';
// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare, date } = location.state || {};
//   const navigate = useNavigate();
//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [seatDetails, setSeatDetails] = useState([]);
//   // Function to fetch bus details including seat details
//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Fetch bus details
//       const busResponse = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(busResponse.data);
//       // Fetch seat details
//       const seatResponse = await axios.get(`${API_URL}/seat/seats/${busId}`);
//       const seats = seatResponse.data || [];
//       setSeatDetails(seats);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);
//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);
//   // Function to check if a seat should be blocked
//   const checkSeatAvailability = (seat) => {
//     if (!seatDetails || seatDetails.length === 0) {
//       return true; // Return true by default if seatDetails is not available
//     }
//     const isBlocked = seatDetails.some((seatDetail) => {
//       const seatBookedFrom = seatDetail.from;
//       const seatBookedTo = seatDetail.to;
//       const currentRouteFrom = from;
//       const currentRouteTo = to;
//       const isOverlapping =
//         (seatBookedFrom <= currentRouteFrom && seatBookedTo >= currentRouteFrom) ||
//         (seatBookedFrom <= currentRouteTo && seatBookedTo >= currentRouteTo) ||
//         (seatBookedFrom >= currentRouteFrom && seatBookedTo <= currentRouteTo);
//       return (
//         isOverlapping &&
//         seatDetail.selectedSeats &&
//         seatDetail.selectedSeats.includes(seat.toString()) &&
//         new Date(seatDetail.bookingDate).toLocaleDateString() === new Date(date).toLocaleDateString()
//       );
//     });
//     return !isBlocked; // Return true if seat should not be blocked
//   };
//   const handleSeatSelection = (seat) => {
//     if (checkSeatAvailability(seat)) {
//       setSelectedSeats((prevSelectedSeats) => {
//         if (prevSelectedSeats.includes(seat)) {
//           return prevSelectedSeats.filter((s) => s !== seat);
//         } else {
//           return [...prevSelectedSeats, seat];
//         }
//       });
//     } else {
//       alert('This seat is already booked for the selected journey.');
//     }
//   };
//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;
//   const handleBooking = () => {
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//       bookingDate: date,
//     };
//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };
//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }
//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }
//   if (!bus) {
//     return <div>No bus details available</div>;
//   }
//   const halfCapacity = Math.ceil(bus.capacity / 2);
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Half</h6>
//               <div className="seat-selection">
//                 {[...Array(halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${
//                       !checkSeatAvailability(seat) ? 'btn-danger' : selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat)}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper Half</h6>
//               <div className="seat-selection">
//                 {[...Array(bus.capacity - halfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + halfCapacity}
//                     className={`btn ${
//                       !checkSeatAvailability(seat + halfCapacity) ? 'btn-danger' : selectedSeats.includes(seat + halfCapacity) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat + halfCapacity)}
//                     onClick={() => handleSeatSelection(seat + halfCapacity)}
//                   >
//                     {seat + 1 + halfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">
//               Discount (%)
//             </label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1F2E2E' }} onClick={handleBooking}>
//             Confirm Booking
//           </button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>
//                       {from} - {to}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Date</td>
//                     <td>{new Date(date).toLocaleDateString()}</td> {/* Format date */}
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">
//               Number of Passengers
//             </label>
//             <input type="number" id="numPassengers" className="form-control" value={numPassengers} readOnly />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BusDetails;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import './BusDetails.css'; // Custom CSS for additional styling
// const API_URL = 'http://localhost:3000';
// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare, date } = location.state || {};
//   const navigate = useNavigate();
//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [seatDetails, setSeatDetails] = useState([]);
//   // Function to fetch bus details including seat details
//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // Fetch bus details
//       const busResponse = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(busResponse.data);
//       // Fetch seat details
//       const seatResponse = await axios.get(`${API_URL}/seat/seats/${busId}`);
//       const seats = seatResponse.data || [];
//       setSeatDetails(seats);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);
//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);
//   // Function to check if a seat should be blocked
//   const checkSeatAvailability = (seat) => {
//     if (!seatDetails || seatDetails.length === 0) {
//       return true; // Return true by default if seatDetails is not available
//     }
//     const currentRouteFrom = from; // Ensure from and to are defined properly
//     const currentRouteTo = to;
//     const isBlocked = seatDetails.some((seatDetail) => {
//       const seatBookedFrom = seatDetail.from;
//       const seatBookedTo = seatDetail.to;
//       const isOverlapping =
//         (seatBookedFrom < currentRouteTo && seatBookedTo > currentRouteFrom) ||
//         (seatBookedFrom >= currentRouteFrom && seatBookedTo <= currentRouteTo);
//       return (
//         isOverlapping &&
//         seatDetail.selectedSeats &&
//         seatDetail.selectedSeats.includes(seat.toString()) &&
//         new Date(seatDetail.bookingDate).toLocaleDateString() === new Date(date).toLocaleDateString()
//       );
//     });
//     return !isBlocked; // Return true if seat should not be blocked
//   };
//   const handleSeatSelection = (seat) => {
//     if (checkSeatAvailability(seat)) {
//       setSelectedSeats((prevSelectedSeats) => {
//         if (prevSelectedSeats.includes(seat)) {
//           return prevSelectedSeats.filter((s) => s !== seat);
//         } else {
//           return [...prevSelectedSeats, seat];
//         }
//       });
//     } else {
//       alert('This seat is already booked for the selected journey.');
//     }
//   };
//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;
//   const handleBooking = () => {
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//       bookingDate: date,
//     };
//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };
//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }
//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }
//   if (!bus) {
//     return <div>No bus details available</div>;
//   }
//   const upperHalfCapacity = Math.ceil(bus.capacity / 2);
//   const lowerHalfCapacity = bus.capacity - upperHalfCapacity;
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Left Side</h6>
//               <div className="seat-selection">
//                 {[...Array(lowerHalfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${
//                       !checkSeatAvailability(seat) ? 'btn-danger' : selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat)}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Right Side</h6>
//               <div className="seat-selection">
//                 {[...Array(upperHalfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + lowerHalfCapacity}
//                     className={`btn ${
//                       !checkSeatAvailability(seat + lowerHalfCapacity) ? 'btn-danger' : selectedSeats.includes(seat + lowerHalfCapacity) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat + lowerHalfCapacity)}
//                     onClick={() => handleSeatSelection(seat + lowerHalfCapacity)}
//                   >
//                     {seat + 1 + lowerHalfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">
//               Discount (%)
//             </label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1F2E2E' }} onClick={handleBooking}>
//             Confirm Booking
//           </button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>
//                       {from} - {to}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Date</td>
//                     <td>{new Date(date).toLocaleDateString()}</td> {/* Format date */}
//                   </tr>
//                   {/* Assuming Route object is available in bus response */}
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">
//               Number of Passengers
//             </label>
//             <input type="number" id="numPassengers" className="form-control" value={numPassengers} readOnly />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BusDetails;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { PiSeatThin } from 'react-icons/pi'; // Importing the seat icon from react-icons

// const API_URL = 'http://localhost:3000';

// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare, date } = location.state || {};
//   const navigate = useNavigate();
//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [seatDetails, setSeatDetails] = useState([]);

//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const busResponse = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(busResponse.data);
//       const seatResponse = await axios.get(`${API_URL}/seat/seats/${busId}`);
//       const seats = seatResponse.data || [];
//       setSeatDetails(seats);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   const checkSeatAvailability = (seat) => {
//     if (!seatDetails || seatDetails.length === 0) {
//       return true;
//     }
//     const currentRouteFrom = from;
//     const currentRouteTo = to;
//     const isBlocked = seatDetails.some((seatDetail) => {
//       const seatBookedFrom = seatDetail.from;
//       const seatBookedTo = seatDetail.to;
//       const isOverlapping =
//         (seatBookedFrom < currentRouteTo && seatBookedTo > currentRouteFrom) ||
//         (seatBookedFrom >= currentRouteFrom && seatBookedTo <= currentRouteTo);
//       return (
//         isOverlapping &&
//         seatDetail.selectedSeats &&
//         seatDetail.selectedSeats.includes(seat.toString()) &&
//         new Date(seatDetail.bookingDate).toLocaleDateString() === new Date(date).toLocaleDateString()
//       );
//     });
//     return !isBlocked;
//   };

//   const handleSeatSelection = (seat) => {
//     if (checkSeatAvailability(seat)) {
//       setSelectedSeats((prevSelectedSeats) => {
//         if (prevSelectedSeats.includes(seat)) {
//           return prevSelectedSeats.filter((s) => s !== seat);
//         } else {
//           return [...prevSelectedSeats, seat];
//         }
//       });
//     } else {
//       alert('This seat is already booked for the selected journey.');
//     }
//   };

//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//       bookingDate: date,
//     };
//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const upperHalfCapacity = Math.ceil(bus.capacity / 2);
//   const lowerHalfCapacity = bus.capacity - upperHalfCapacity;

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Left Side</h6>
//               <div className="seat-selection">
//                 {[...Array(lowerHalfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${
//                       !checkSeatAvailability(seat) ? 'btn-danger' : selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat)}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     <PiSeatThin /> {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Right Side</h6>
//               <div className="seat-selection">
//                 {[...Array(upperHalfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + lowerHalfCapacity}
//                     className={`btn ${
//                       !checkSeatAvailability(seat + lowerHalfCapacity) ? 'btn-danger' : selectedSeats.includes(seat + lowerHalfCapacity) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat + lowerHalfCapacity)}
//                     onClick={() => handleSeatSelection(seat + lowerHalfCapacity)}
//                   >
//                     <PiSeatThin /> {seat + 1 + lowerHalfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">
//               Discount (%)
//             </label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1F2E2E' }} onClick={handleBooking}>
//             Confirm Booking
//           </button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>
//                       {from} - {to}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Date</td>
//                     <td>{new Date(date).toLocaleDateString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">
//               Number of Passengers
//             </label>
//             <input type="number" id="numPassengers" className="form-control" value={numPassengers} readOnly />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusDetails;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { PiSeatThin } from 'react-icons/pi';
// import { LuBed } from 'react-icons/lu';

// const API_URL = 'http://localhost:3000';

// const BusDetails = () => {
//   const location = useLocation();
//   const { busId, from, to, fare, date } = location.state || {};
//   const navigate = useNavigate();
//   const [bus, setBus] = useState(null);
//   const [numPassengers, setNumPassengers] = useState(1);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [seatDetails, setSeatDetails] = useState([]);

//   const fetchBusDetails = async (busId) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const busResponse = await axios.get(`${API_URL}/bus/${busId}`);
//       setBus(busResponse.data);
//       const seatResponse = await axios.get(`${API_URL}/seat/seats/${busId}`);
//       const seats = seatResponse.data || [];
//       setSeatDetails(seats);
//     } catch (error) {
//       setError('Error fetching bus details. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (busId) {
//       fetchBusDetails(busId);
//     }
//   }, [busId]);

//   useEffect(() => {
//     setNumPassengers(selectedSeats.length);
//   }, [selectedSeats]);

//   const checkSeatAvailability = (seat) => {
//     if (!seatDetails || seatDetails.length === 0) {
//       return true;
//     }
//     const currentRouteFrom = from;
//     const currentRouteTo = to;
//     const isBlocked = seatDetails.some((seatDetail) => {
//       const seatBookedFrom = seatDetail.from;
//       const seatBookedTo = seatDetail.to;
//       const isOverlapping =
//         (seatBookedFrom < currentRouteTo && seatBookedTo > currentRouteFrom) ||
//         (seatBookedFrom >= currentRouteFrom && seatBookedTo <= currentRouteTo);
//       return (
//         isOverlapping &&
//         seatDetail.selectedSeats &&
//         seatDetail.selectedSeats.includes(seat.toString()) &&
//         new Date(seatDetail.bookingDate).toLocaleDateString() === new Date(date).toLocaleDateString()
//       );
//     });
//     return !isBlocked;
//   };

//   const handleSeatSelection = (seat) => {
//     if (checkSeatAvailability(seat)) {
//       setSelectedSeats((prevSelectedSeats) => {
//         if (prevSelectedSeats.includes(seat)) {
//           return prevSelectedSeats.filter((s) => s !== seat);
//         } else {
//           return [...prevSelectedSeats, seat];
//         }
//       });
//     } else {
//       alert('This seat is already booked for the selected journey.');
//     }
//   };

//   const cartSubtotal = selectedSeats.length * fare || 0;
//   const discountAmount = cartSubtotal * (discount / 100);
//   const cartTotalBeforeGST = cartSubtotal - discountAmount;
//   const GST = cartTotalBeforeGST * 0.05;
//   const cartTotal = cartTotalBeforeGST + GST;

//   const handleBooking = () => {
//     const bookingDetails = {
//       selectedSeats,
//       bus,
//       numPassengers,
//       discount,
//       discountAmount,
//       GST,
//       cartTotal,
//       from,
//       to,
//       fare,
//       bookingDate: date,
//     };
//     navigate('/billing', { state: { bookingDetails, customerDetails } });
//   };

//   if (isLoading) {
//     return <div className="container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="container alert alert-danger">{error}</div>;
//   }

//   if (!bus) {
//     return <div>No bus details available</div>;
//   }

//   const upperHalfCapacity = Math.ceil(bus.capacity / 2);
//   const lowerHalfCapacity = bus.capacity - upperHalfCapacity;
//   const SeatIcon = bus.busType.includes('Sleeper') ? LuBed : PiSeatThin;

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="mb-4">
//             <h5>Select Seats</h5>
//             <div className="mb-3">
//               <h6>Lower Berth</h6>
//               <div className="seat-selection">
//                 {[...Array(lowerHalfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat}
//                     className={`btn ${
//                       !checkSeatAvailability(seat) ? 'btn-danger' : selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat)}
//                     onClick={() => handleSeatSelection(seat)}
//                   >
//                     <SeatIcon /> {seat + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <h6>Upper berth</h6>
//               <div className="seat-selection">
//                 {[...Array(upperHalfCapacity).keys()].map((seat) => (
//                   <button
//                     key={seat + lowerHalfCapacity}
//                     className={`btn ${
//                       !checkSeatAvailability(seat + lowerHalfCapacity) ? 'btn-danger' : selectedSeats.includes(seat + lowerHalfCapacity) ? 'btn-success' : 'btn-outline-primary'
//                     } m-1`}
//                     disabled={!checkSeatAvailability(seat + lowerHalfCapacity)}
//                     onClick={() => handleSeatSelection(seat + lowerHalfCapacity)}
//                   >
//                     <SeatIcon /> {seat + 1 + lowerHalfCapacity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="discount" className="form-label">
//               Discount (%)
//             </label>
//             <input
//               type="number"
//               id="discount"
//               className="form-control"
//               value={discount}
//               onChange={(e) => setDiscount(parseFloat(e.target.value))}
//             />
//           </div>
//           <button className="btn btn-primary" style={{ backgroundColor: '#1F2E2E' }} onClick={handleBooking}>
//             Confirm Booking
//           </button>
//         </div>
//         <div className="col-md-6">
//           <div className="card mb-4">
//             <div className="card-body">
//               <h5 className="card-title">{bus.busName}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//               <table className="table table-bordered">
//                 <tbody>
//                   <tr>
//                     <td>From - To</td>
//                     <td>
//                       {from} - {to}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Bus Type</td>
//                     <td>{bus.busType}</td>
//                   </tr>
//                   <tr>
//                     <td>Date</td>
//                     <td>{new Date(date).toLocaleDateString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Departure</td>
//                     <td>{new Date(bus.Route.departure).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Arrival</td>
//                     <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Fare</td>
//                     <td>₹ {fare.toLocaleString()}</td>
//                   </tr>
//                   <tr>
//                     <td>Remaining Capacity</td>
//                     <td>{bus.capacity - selectedSeats.length}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="numPassengers" className="form-label">
//               Number of Passengers
//             </label>
//             <input type="number" id="numPassengers" className="form-control" value={numPassengers} readOnly />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusDetails;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiSeatThin } from 'react-icons/pi';
import { LuBed } from 'react-icons/lu';

const API_URL = 'http://localhost:3000';

const Info = () => {
  const location = useLocation();
  const { busId, from, to, fare, date } = location.state || {};
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [numPassengers, setNumPassengers] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [seatDetails, setSeatDetails] = useState([]);

  useEffect(() => {
    if (busId) {
      fetchBusDetails(busId);
    }
  }, [busId]);

  useEffect(() => {
    setNumPassengers(selectedSeats.length);
  }, [selectedSeats]);

  const fetchBusDetails = async (busId) => {
    setIsLoading(true);
    setError(null);
    try {
      const busResponse = await axios.get(`${API_URL}/bus/${busId}`);
      setBus(busResponse.data);
      const seatResponse = await axios.get(`${API_URL}/seat/seats/${busId}`);
      const seats = seatResponse.data || [];
      setSeatDetails(seats);
    } catch (error) {
      setError('Error fetching bus details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkSeatAvailability = (seat) => {
    if (!seatDetails || seatDetails.length === 0) {
      return true;
    }
    const currentRouteFrom = from;
    const currentRouteTo = to;
    const isBlocked = seatDetails.some((seatDetail) => {
      const seatBookedFrom = seatDetail.from;
      const seatBookedTo = seatDetail.to;
      const isOverlapping =
        (seatBookedFrom < currentRouteTo && seatBookedTo > currentRouteFrom) ||
        (seatBookedFrom >= currentRouteFrom && seatBookedTo <= currentRouteTo);
      return (
        isOverlapping &&
        seatDetail.selectedSeats &&
        seatDetail.selectedSeats.includes(seat.toString()) &&
        new Date(seatDetail.bookingDate).toLocaleDateString() === new Date(date).toLocaleDateString()
      );
    });
    return !isBlocked;
  };

  const handleSeatSelection = (seat) => {
    if (checkSeatAvailability(seat)) {
      setSelectedSeats((prevSelectedSeats) => {
        if (prevSelectedSeats.includes(seat)) {
          return prevSelectedSeats.filter((s) => s !== seat);
        } else {
          return [...prevSelectedSeats, seat];
        }
      });
    } else {
      alert('This seat is already booked for the selected journey.');
    }
  };

  const cartSubtotal = selectedSeats.length * fare || 0;
  const discountAmount = cartSubtotal * (discount / 100);
  const cartTotalBeforeGST = cartSubtotal - discountAmount;
  const GST = cartTotalBeforeGST * 0.05;
  const cartTotal = cartTotalBeforeGST + GST;

  const handleBooking = () => {
    const bookingDetails = {
      selectedSeats,
      bus,
      numPassengers,
      discount,
      discountAmount,
      GST,
      cartTotal,
      from,
      to,
      fare,
      bookingDate: date,
    };
    navigate('/billing', { state: { bookingDetails, customerDetails } });
  };

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container alert alert-danger">{error}</div>;
  }

  if (!bus) {
    return <div>No bus details available</div>;
  }

  const upperHalfCapacity = Math.ceil(bus.capacity / 2);
  const lowerHalfCapacity = bus.capacity - upperHalfCapacity;
  const SeatIcon = bus.busType.includes('Sleeper') ? LuBed : PiSeatThin;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-4">
            <h5>Select Seats</h5>
            <div className="mb-3">
              <h6>Lower Berth</h6>
              <div className="seat-selection">
                {[...Array(lowerHalfCapacity).keys()].map((seat) => (
                  <button
                    key={seat}
                    className={`btn ${
                      !checkSeatAvailability(seat) ? 'btn-danger' : selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'
                    } m-1`}
                    disabled={!checkSeatAvailability(seat)}
                    onClick={() => handleSeatSelection(seat)}
                  >
                    <SeatIcon /> {seat + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <h6>Upper Berth</h6>
              <div className="seat-selection">
                {[...Array(upperHalfCapacity).keys()].map((seat) => (
                  <button
                    key={seat + lowerHalfCapacity}
                    className={`btn ${
                      !checkSeatAvailability(seat + lowerHalfCapacity) ? 'btn-danger' : selectedSeats.includes(seat + lowerHalfCapacity) ? 'btn-success' : 'btn-outline-primary'
                    } m-1`}
                    disabled={!checkSeatAvailability(seat + lowerHalfCapacity)}
                    onClick={() => handleSeatSelection(seat + lowerHalfCapacity)}
                  >
                    <SeatIcon /> {seat + 1 + lowerHalfCapacity}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="discount" className="form-label">
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              className="form-control"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
          </div>
          <button className="btn btn-primary" style={{ backgroundColor: '#1F2E2E' }} onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{bus.busName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>From - To</td>
                    <td>
                      {from} - {to}
                    </td>
                  </tr>
                  <tr>
                    <td>Bus Type</td>
                    <td>{bus.busType}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{new Date(date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>Departure</td>
                    <td>{new Date(bus.Route.departure).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Arrival</td>
                    <td>{new Date(bus.Route.arrival).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Fare</td>
                    <td>₹ {fare.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Remaining Capacity</td>
                    <td>{bus.capacity - selectedSeats.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="numPassengers" className="form-label">
              Number of Passengers
            </label>
            <input type="number" id="numPassengers" className="form-control" value={numPassengers} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
