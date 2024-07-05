
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Import jspdf-autotable
// import '../App.css';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customer_name: customerDetails?.name || 'N/A',
//       phone_number: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       bus_id: bus?.busId || 'N/A',
//       selected_seats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discount_amount: discountAmount || 0,
//       gst: GST || 0,
//       cart_total: cartTotal || 0,
//       route: bus ? `${bus.from} - ${bus.to}` : 'N/A',
//       bus_type: bus?.busType || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData); // Call PDF generation function
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();

//     // Add header with company name and invoice title
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Customer details section
//     doc.setFontSize(12);
//     doc.text(`Customer Name: ${bookingData.customer_name}`, 20, 50);
//     doc.text(`Phone Number: ${bookingData.phone_number}`, 20, 60);
//     doc.text(`Email: ${bookingData.email}`, 20, 70);
//     doc.text(`Address: ${bookingData.address}`, 20, 80);

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.text(`Bus Name: ${bus.busName}`, 20, 110);
//     doc.text(`Bus Number: ${bus.busNumber}`, 20, 120);
//     doc.text(`Route: ${bookingData.route}`, 20, 130);
//     doc.text(`Type: ${bus.busType}`, 20, 140);
//     doc.text(`Departure: ${new Date(bus.departure).toLocaleString()}`, 20, 150);
//     doc.text(`Arrival: ${new Date(bus.arrival).toLocaleString()}`, 20, 160);
//     doc.text(`Fare: ₹ ${bus.fare.toLocaleString()}`, 20, 170);
//     doc.text(`Selected Seats: ${bookingData.selected_seats.join(', ')}`, 20, 180);
//     doc.text(`Number of Passengers: ${bookingData.passenger_details.length}`, 20, 190);

//     // Passenger details table
//     doc.autoTable({
//       startY: 200,
//       head: [['Passenger', 'Name', 'Age', 'Gender']],
//       body: bookingData.passenger_details.map((passenger, index) => [
//         `Passenger ${index + 1}`,
//         passenger.name,
//         passenger.age,
//         passenger.gender
//       ]),
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discount_amount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.gst.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cart_total.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customer_name.replace(/\s/g, '_')}.pdf`);
//   };
//    return (
//     <div className="container">
//       <h2>Booking Confirmation</h2>
//       <hr />
//       {customerDetails && (
//         <div>
//           <h4>Customer Name: {customerDetails.name}</h4>
//           <p>Phone Number: {customerDetails.phoneNumber}</p>
//           <p>Email: {customerDetails.email}</p>
//           <p>Address: {customerDetails.address}</p>
//         </div>
//       )}
//       <hr />
//       {bus && (
//         <div>
//           <h3>Bus Details:</h3>
//           <p><strong>Bus Name:</strong> {bus.busName}</p>
//           <p><strong>Bus Number:</strong> {bus.busNumber}</p>
//           <p><strong>Route:</strong> {bus.from} - {bus.to}</p>
//           <p><strong>Type:</strong> {bus.busType}</p>
//           <p><strong>Departure:</strong> {new Date(bus.departure).toLocaleString()}</p>
//           <p><strong>Arrival:</strong> {new Date(bus.arrival).toLocaleString()}</p>
//           <p><strong>Fare:</strong> ₹ {bus.fare.toLocaleString()}</p>
//           <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
//           <p><strong>Number of Passengers:</strong> {numPassengers}</p>
//         </div>
//       )}
//       <hr />
//       <div>
//         <h3>Passenger Details:</h3>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="passenger-form">
//             <h4>Passenger {index + 1}</h4>
//             <div className="form-group">
//               <label htmlFor={`name-${index}`}>Name</label>
//               <input
//                 type="text"
//                 id={`name-${index}`}
//                 className="form-control"
//                 value={passenger.name}
//                 onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`age-${index}`}>Age</label>
//               <input
//                 type="number"
//                 id={`age-${index}`}
//                 className="form-control"
//                 value={passenger.age}
//                 onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`gender-${index}`}>Gender</label>
//               <select
//                 id={`gender-${index}`}
//                 className="form-control"
//                 value={passenger.gender}
//                 onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <hr />
//           </div>
//         ))}
//       </div>
//       <div className="totals">
//         <h3>Discount: ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</h3>
//         <h3>GST (5%): ₹ {GST ? GST.toLocaleString() : 0}</h3>
//         <h2>Total: ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</h2>
//       </div>
//       <button className="btn btn-primary" onClick={handleConfirmBooking}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default Billing;


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // Import jspdf-autotable

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customer_name: customerDetails?.name || 'N/A',
//       phone_number: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       bus_id: bus?.busId || 'N/A',
//       selected_seats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discount_amount: discountAmount || 0,
//       gst: GST || 0,
//       cart_total: cartTotal || 0,
//       route: bus ? `${bus.from} - ${bus.to}` : 'N/A',
//       bus_type: bus?.busType || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData); // Call PDF generation function
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();

//     // Add header with company name and invoice title
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Customer details section
//     doc.setFontSize(12);
//     doc.text(`Customer Name: ${bookingData.customer_name}`, 20, 50);
//     doc.text(`Phone Number: ${bookingData.phone_number}`, 20, 60);
//     doc.text(`Email: ${bookingData.email}`, 20, 70);
//     doc.text(`Address: ${bookingData.address}`, 20, 80);

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['Route', bookingData.route],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bus.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selected_seats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discount_amount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.gst.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cart_total.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customer_name.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2>Booking Confirmation</h2>
//       <hr />
//       {customerDetails && (
//         <div>
//           <h4>Customer Name: {customerDetails.name}</h4>
//           <p>Phone Number: {customerDetails.phoneNumber}</p>
//           <p>Email: {customerDetails.email}</p>
//           <p>Address: {customerDetails.address}</p>
//         </div>
//       )}
//       <hr />
//       {bus && (
//         <div>
//           <h3>Bus Details:</h3>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <td><strong>Bus Name</strong></td>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <td><strong>Bus Number</strong></td>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <td><strong>Route</strong></td>
//                 <td>{bus.from} - {bus.to}</td>
//               </tr>
//               <tr>
//                 <td><strong>Type</strong></td>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <td><strong>Departure</strong></td>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <td><strong>Arrival</strong></td>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <td><strong>Fare</strong></td>
//                 <td>₹ {bus.fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <td><strong>Selected Seats</strong></td>
//                 <td>{selectedSeats.join(', ')}</td>
//               </tr>
//               <tr>
//                 <td><strong>Number of Passengers</strong></td>
//                 <td>{numPassengers}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//       <hr />
//       <div>
//         <h3>Passenger Details:</h3>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="passenger-form">
//             <h4>Passenger {index + 1}</h4>
//             <div className="form-group">
//               <label htmlFor={`name-${index}`}>Name</label>
//               <input
//                 type="text"
//                 id={`name-${index}`}
//                 className="form-control"
//                 value={passenger.name}
//                 onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`age-${index}`}>Age</label>
//               <input
//                 type="number"
//                 id={`age-${index}`}
//                 className="form-control"
//                 value={passenger.age}
//                 onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor={`gender-${index}`}>Gender</label>
//               <select
//                 id={`gender-${index}`}
//                 className="form-control"
//                 value={passenger.gender}
//                 onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <hr />
//           </div>
//         ))}
//       </div>
//       <div className="totals">
//         <h3>Discount: ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</h3>
//         <h3>GST (5%): ₹ {GST ? GST.toLocaleString() : 0}</h3>
//         <h2>Total: ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</h2>
//       </div>
//       <div className="mt-4">
//         <button className="btn btn -primary me-3" onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';


// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customer_name: customerDetails?.name || 'N/A',
//       phone_number: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       bus_id: bus?.busId || 'N/A',
//       selected_seats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discount_amount: discountAmount || 0,
//       gst: GST || 0,
//       cart_total: cartTotal || 0,
//       route: bus ? `${bus.from} - ${bus.to}` : 'N/A',
//       bus_type: bus?.busType || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData);
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//         doc.text('Journey -Jet', 105, 20, 'center');
//         doc.setFontSize(18);
//         doc.text('Invoice', 105, 35, 'center');
    
        
    
//         // Bus details section
//         doc.text('Bus Details:', 20, 100);
//         doc.autoTable({
//           startY: 105,
//           head: [['Attribute', 'Value']],
//           body: [
//             ['Bus Name', bus.busName],
//             ['Bus Number', bus.busNumber],
//             ['Route', bookingData.route],
//             ['Type', bus.busType],
//             ['Departure', new Date(bus.Route.departure).toLocaleString()],
//             ['Arrival', new Date(bus.Route.arrival).toLocaleString()],
//             ['Fare', `₹ ${bus.fare.toLocaleString()}`],
//             ['Selected Seats', bookingData.selected_seats.join(', ')],
//             ['Number of Passengers', bookingData.passenger_details.length.toString()],
//           ],
//           didDrawPage: (data) => {
//             // Add page numbers
//             doc.setFontSize(12);
//             doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//           }
//         });
    
//         // Totals section
//         doc.setFontSize(16);
//         doc.text(`Discount: ₹ ${bookingData.discount_amount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//         doc.text(`GST (5%): ₹ ${bookingData.gst.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//         doc.text(`Total: ₹ ${bookingData.cart_total.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);
    
//         // Save PDF with a professional filename
//         doc.save(`JourneyJet_Invoice_${bookingData.customer_name.replace(/\s/g, '_')}.pdf`);
//       };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>Route</th>
//                 <td>{bus.Route.from} - {bus.Route.to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {bus.fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e' ,text:'white'}} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e' ,text:'white'}} onClick={() => navigate(-1)}>
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       route: bus ? `${bus.Route.from} - ${bus.Route.to}` : 'N/A',
//       busType: bus?.busType || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData);
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['Route', bookingData.route],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bus.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>Route</th>
//                 <td>{bus.Route.from} - {bus.Route.to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {bus.fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate(-1)}>
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData);
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From - To', `${bookingData.from} - ${bookingData.to}`],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From - To</th>
//                 <td>{from} - {to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A'
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData);
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
              
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate // Access booking date here
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A' // Ensure booking date is included
//     };

//     const seat={
//       busId: bus?.busId || 'N/A',
//       from,
//       to,
//       selectedSeats: selectedSeats || []
//     };

//     try {
//       const response = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Booking confirmed:', data);
//         generatePDF(bookingData);
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Booking error:', errorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   try{
//     const r1=await fetch('http://localhost:3000/seat',{
//       method:'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(seat),
//     });
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
//       }
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
              
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, customerDetails } = location.state || {};

  const {
    selectedSeats,
    bus,
    numPassengers,
    discountAmount,
    GST,
    cartTotal,
    from,
    to,
    fare,
    bookingDate, // Access booking date here
  } = bookingDetails || {};

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
  );

  const handlePassengerChange = (index, field, value) => {
    const updatedDetails = passengerDetails.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengerDetails(updatedDetails);
  };

  const validatePassengerDetails = () => {
    for (const passenger of passengerDetails) {
      if (!passenger.name || !passenger.age || !passenger.gender) {
        return false;
      }
    }
    return true;
  };

  const handleConfirmBooking = async () => {
    if (!validatePassengerDetails()) {
      alert('Please fill in all passenger details.');
      return;
    }

    const bookingData = {
      customerName: customerDetails?.name || 'N/A',
      phoneNumber: customerDetails?.phoneNumber || 'N/A',
      email: customerDetails?.email || 'N/A',
      address: customerDetails?.address || 'N/A',
      busId: bus?.busId || 'N/A',
      selectedSeats: selectedSeats || [],
      passenger_details: passengerDetails,
      discountAmount: discountAmount || 0,
      GST: GST || 0,
      cartTotal: cartTotal || 0,
      from,
      to,
      fare,
      busType: bus?.busType || 'N/A',
      bookingDate: bookingDate || 'N/A', // Ensure booking date is included
    };

    // const seatData = {
    //   busId: bus?.busId || 'N/A',
    //   from,
    //   to,
    //   selectedSeats: selectedSeats+1|| [],
    //   bookingDate: bookingDate || 'N/A'
    // };
    const seatData = {
      busId: bus?.busId || 'N/A',
      from,
      to,
      selectedSeats: selectedSeats.map(seat => seat + 1) || [],
      bookingDate: bookingDate || 'N/A'
    };
    
    

    try {
      const bookingResponse = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (bookingResponse.ok) {
        const bookingResult = await bookingResponse.json();
        console.log('Booking confirmed:', bookingResult);

        try {
          const seatResponse = await fetch('http://localhost:3000/seat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(seatData),
          });

          if (seatResponse.ok) {
            console.log('Seats booked successfully.');
          } else {
            const seatErrorData = await seatResponse.json();
            console.error('Seat booking error:', seatErrorData);
            alert('Failed to book seats. Please try again.');
          }
        } catch (seatError) {
          console.error('Error booking seats:', seatError);
          alert('An error occurred while booking the seats. Please try again.');
        }

        generatePDF(bookingData);
        alert('Booking confirmed successfully!');
        navigate('/');
      } else {
        const bookingErrorData = await bookingResponse.json();
        console.error('Booking error:', bookingErrorData);
        alert('Failed to confirm booking. Please try again.');
      }
    } catch (bookingError) {
      console.error('Error:', bookingError);
      alert('An error occurred while confirming the booking. Please try again.');
    }
  };

  const generatePDF = (bookingData) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Journey -Jet', 105, 20, 'center');
    doc.setFontSize(18);
    doc.text('Invoice', 105, 35, 'center');

    // Bus details section
    doc.text('Bus Details:', 20, 100);
    doc.autoTable({
      startY: 105,
      head: [['Attribute', 'Value']],
      body: [
        ['Bus Name', bus.busName],
        ['Bus Number', bus.busNumber],
        ['From', bookingData.from],
        ['To', bookingData.to],
        ['Type', bus.busType],
        ['Departure', new Date(bus.departure).toLocaleString()],
        ['Arrival', new Date(bus.arrival).toLocaleString()],
        ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
        ['Selected Seats', bookingData.selectedSeats.join(', ')],
        ['Number of Passengers', bookingData.passenger_details.length.toString()],
        ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()], // Display booking date
      ],
      didDrawPage: (data) => {
        // Add page numbers
        doc.setFontSize(12);
        doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
      },
    });

    // Totals section
    doc.setFontSize(16);
    doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
    doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
    doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

    // Save PDF with a professional filename
    doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Booking Confirmation</h2>

      {customerDetails && (
        <div className="mb-4">
          <h4>Customer Details:</h4>
          <p><strong>Name:</strong> {customerDetails.name}</p>
          <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
          <p><strong>Email:</strong> {customerDetails.email}</p>
          <p><strong>Address:</strong> {customerDetails.address}</p>
        </div>
      )}

      {bus && (
        <div className="mb-4">
          <h4>Bus Details:</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Bus Name</th>
                <td>{bus.busName}</td>
              </tr>
              <tr>
                <th>Bus Number</th>
                <td>{bus.busNumber}</td>
              </tr>
              <tr>
                <th>From</th>
                <td>{from}</td>
              </tr>
              <tr>
                <th>To</th>
                <td>{to}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{bus.busType}</td>
              </tr>
              <tr>
                <th>Departure</th>
                <td>{new Date(bus.departure).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Arrival</th>
                <td>{new Date(bus.arrival).toLocaleString()}</td>
              </tr>
              <tr>
                <th>Fare</th>
                <td>₹ {fare.toLocaleString()}</td>
              </tr>
              {/* <tr>
                <th>Selected Seats</th>
                <td>{selectedSeats.join(', ')}</td>
              </tr> */}
              <tr>
  <th>Selected Seats</th>
  <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
</tr>
              <tr>
                <th>Number of Passengers</th>
                <td>{numPassengers}</td>
              </tr>
              <tr>
                <th>Booking Date</th>
                <td>{new Date(bookingDate).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="mb-4">
        <h4>Passenger Details:</h4>
        <table className="table passenger-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {passengerDetails.map((passenger, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="totals">
        <h4>Total Summary:</h4>
        <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
        <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
        <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
      </div>

      <div className="buttons mt-4">
        <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
          Confirm Booking
        </button>
        <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Payment;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [email, setEmail] = useState('');

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A', // Use customer's email or fallback to 'N/A'
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const seatData = {
//       busId: bus?.busId || 'N/A',
//       from,
//       to,
//       selectedSeats: selectedSeats.map(seat => seat + 1) || [],
//       bookingDate: bookingDate || 'N/A',
//     };

//     try {
//       const bookingResponse = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (bookingResponse.ok) {
//         const bookingResult = await bookingResponse.json();
//         console.log('Booking confirmed:', bookingResult);

//         try {
//           const seatResponse = await fetch('http://localhost:3000/seat', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(seatData),
//           });

//           if (seatResponse.ok) {
//             console.log('Seats booked successfully.');
//           } else {
//             const seatErrorData = await seatResponse.json();
//             console.error('Seat booking error:', seatErrorData);
//             alert('Failed to book seats. Please try again.');
//           }
//         } catch (seatError) {
//           console.error('Error booking seats:', seatError);
//           alert('An error occurred while booking the seats. Please try again.');
//         }

//         generatePDF(bookingData);
//         sendEmail(email); // Send email with user-entered email address
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const bookingErrorData = await bookingResponse.json();
//         console.error('Booking error:', bookingErrorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (bookingError) {
//       console.error('Error:', bookingError);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
//   };

//   const sendEmail = async (recipientEmail) => {
//     try {
//       const emailResponse = await fetch('http://localhost:3000/email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ recipientEmail }),
//       });

//       if (emailResponse.ok) {
//         console.log('Email sent successfully.');
//       } else {
//         const emailErrorData = await emailResponse.json();
//         console.error('Email sending error:', emailErrorData);
//         alert('Failed to send email. Please check your internet connection and try again.');
//       }
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       alert('An error occurred while sending the email. Please try again.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-4">
//         <h4>Email Address:</h4>
//         <input
//           type="email"
//           className="form-control"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [email, setEmail] = useState('');

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A', // Use customer's email or fallback to 'N/A'
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const seatData = {
//       busId: bus?.busId || 'N/A',
//       from,
//       to,
//       selectedSeats: selectedSeats.map(seat => seat ) || [],
//       bookingDate: bookingDate || 'N/A',
//     };

//     try {
//       const bookingResponse = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (bookingResponse.ok) {
//         const bookingResult = await bookingResponse.json();
//         console.log('Booking confirmed:', bookingResult);

//         try {
//           const seatResponse = await fetch('http://localhost:3000/seat', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(seatData),
//           });

//           if (seatResponse.ok) {
//             console.log('Seats booked successfully.');
//           } else {
//             const seatErrorData = await seatResponse.json();
//             console.error('Seat booking error:', seatErrorData);
//             alert('Failed to book seats. Please try again.');
//             return;
//           }
//         } catch (seatError) {
//           console.error('Error booking seats:', seatError);
//           alert('An error occurred while booking the seats. Please try again.');
//           return;
//         }

//         const pdfBlob = generatePDF(bookingData);
//         sendEmail(bookingData.email, pdfBlob); // Send email with user-entered email address and PDF attachment
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const bookingErrorData = await bookingResponse.json();
//         console.error('Booking error:', bookingErrorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (bookingError) {
//       console.error('Error:', bookingError);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     const pdfBlob = doc.output('blob');
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
    
//     return pdfBlob;
//   };

//   const sendEmail = async (recipientEmail) => {
//     try {
//       const emailResponse = await fetch('http://localhost:3000/email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ recipientEmail }),
//       });
  
//       if (emailResponse.ok) {
//         console.log('Email sent successfully.');
//         alert('Email sent successfully!');
//       } else {
//         const emailErrorData = await emailResponse.json();
//         console.error('Email sending error:', emailErrorData);
//         alert('Failed to send email. Please check server logs for details.');
//       }
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       alert('An error occurred while sending the email. Please try again later.');
//     }
//   };
  
//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-4">
//         <h4>Email Address:</h4>
//         <input
//           type="email"
//           className="form-control"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [email, setEmail] = useState('');

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const seatData = {
//       busId: bus?.busId || 'N/A',
//       from,
//       to,
//       selectedSeats: selectedSeats.map(seat => seat) || [],
//       bookingDate: bookingDate || 'N/A',
//     };

//     try {
//       const bookingResponse = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (bookingResponse.ok) {
//         const bookingResult = await bookingResponse.json();
//         console.log('Booking confirmed:', bookingResult);

//         try {
//           const seatResponse = await fetch('http://localhost:3000/seat', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(seatData),
//           });

//           if (seatResponse.ok) {
//             console.log('Seats booked successfully.');
//           } else {
//             const seatErrorData = await seatResponse.json();
//             console.error('Seat booking error:', seatErrorData);
//             alert('Failed to book seats. Please try again.');
//             return;
//           }
//         } catch (seatError) {
//           console.error('Error booking seats:', seatError);
//           alert('An error occurred while booking the seats. Please try again.');
//           return;
//         }

//         const pdfBlob = await generatePDF(bookingData);
//         await sendEmail(bookingData.email, pdfBlob);
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const bookingErrorData = await bookingResponse.json();
//         console.error('Booking error:', bookingErrorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (bookingError) {
//       console.error('Error:', bookingError);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = async (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     const pdfBlob = doc.output('blob');
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);
    
//     return pdfBlob;
//   };

//   const sendEmail = async (recipientEmail, pdfBlob) => {
//     try {
//       const formData = new FormData();
//       formData.append('recipientEmail', recipientEmail);
//       formData.append('invoice', pdfBlob, `JourneyJet_Invoice_${customerDetails.name.replace(/\s/g, '_')}.pdf`);

//       const emailResponse = await fetch('http://localhost:3000/email', {
//         method: 'POST',
//         body: formData,
//       });

//       if (emailResponse.ok) {
//         console.log('Email sent successfully.');
//         alert('Email sent successfully!');
//       } else {
//         const emailErrorData = await emailResponse.json();
//         console.error('Email sending error:', emailErrorData);
//         alert('Failed to send email. Please check server logs for details.');
//       }
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       alert('An error occurred while sending the email. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-4">
//         <h4>Email Address:</h4>
//         <input
//           type="email"
//           className="form-control"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [email, setEmail] = useState('');

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     const seatData = {
//       busId: bus?.busId || 'N/A',
//       from,
//       to,
//       selectedSeats: selectedSeats.map(seat => seat) || [],
//       bookingDate: bookingDate || 'N/A',
//     };

//     try {
//       const bookingResponse = await fetch('http://localhost:3000/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       if (bookingResponse.ok) {
//         const bookingResult = await bookingResponse.json();
//         console.log('Booking confirmed:', bookingResult);

//         try {
//           const seatResponse = await fetch('http://localhost:3000/seat', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(seatData),
//           });

//           if (seatResponse.ok) {
//             console.log('Seats booked successfully.');
//           } else {
//             const seatErrorData = await seatResponse.json();
//             console.error('Seat booking error:', seatErrorData);
//             alert('Failed to book seats. Please try again.');
//             return;
//           }
//         } catch (seatError) {
//           console.error('Error booking seats:', seatError);
//           alert('An error occurred while booking the seats. Please try again.');
//           return;
//         }

//         const pdfBlob = await generatePDF(bookingData);
//         await sendEmail(email, pdfBlob);
//         alert('Booking confirmed successfully!');
//         navigate('/');
//       } else {
//         const bookingErrorData = await bookingResponse.json();
//         console.error('Booking error:', bookingErrorData);
//         alert('Failed to confirm booking. Please try again.');
//       }
//     } catch (bookingError) {
//       console.error('Error:', bookingError);
//       alert('An error occurred while confirming the booking. Please try again.');
//     }
//   };

//   const generatePDF = async (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey -Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     const pdfBlob = doc.output('blob');
//     return pdfBlob;
//   };

//   // const sendEmail = async (recipientEmail, pdfBlob) => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append('recipientEmail', recipientEmail);
//   //     formData.append('invoice', pdfBlob, `JourneyJet_Invoice_${customerDetails.name.replace(/\s/g, '_')}.pdf`);

//   //     const emailResponse = await fetch('http://localhost:3000/email', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     if (emailResponse.ok) {
//   //       console.log('Email sent successfully.');
//   //       alert('Email sent successfully!');
//   //     } else {
//   //       const emailErrorData = await emailResponse.json();
//   //       console.error('Email sending error:', emailErrorData);
//   //       alert('Failed to send email. Please check server logs for details.');
//   //     }
//   //   } catch (emailError) {
//   //     console.error('Error sending email:', emailError);
//   //     alert('An error occurred while sending the email. Please try again later.');
//   //   }
//   // };

//   // const sendEmail = async (recipientEmail, pdfBlob) => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append('recipientEmail', recipientEmail);
//   //     formData.append('pdf', pdfBlob, `JourneyJet_Invoice_${customerDetails.name.replace(/\s/g, '_')}.pdf`);
  
//   //     const emailResponse = await fetch('http://localhost:3000/email', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });
  
//   //     if (emailResponse.ok) {
//   //       console.log('Email sent successfully.');
//   //       alert('Email sent successfully!');
//   //     } else {
//   //       const emailErrorData = await emailResponse.json();
//   //       console.error('Email sending error:', emailErrorData);
//   //       alert('Failed to send email. Please check server logs for details.');
//   //     }
//   //   } catch (emailError) {
//   //     console.error('Error sending email:', emailError);
//   //     alert('An error occurred while sending the email. Please try again later.');
//   //   }
//   // };
  
//   const sendEmail = async (recipientEmail) => {
//     try {
//       const formData = new FormData();
//       formData.append('recipientEmail', recipientEmail);
  
//       const emailResponse = await fetch('http://localhost:3000/email', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (emailResponse.ok) {
//         console.log('Email sent successfully.');
//         alert('Email sent successfully!');
//       } else {
//         const emailErrorData = await emailResponse.json();
//         console.error('Email sending error:', emailErrorData);
//         alert('Failed to send email. Please check server logs for details.');
//       }
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       alert('An error occurred while sending the email. Please try again later.');
//     }
//   };
  

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-4">
//         <h4>Email Address:</h4>
//         <input
//           type="email"
//           className="form-control"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />
//       </div>

//       <div className="totals">
//         <h4>Total Summary:</h4>
//         <div className="mb-3"><strong>Discount:</strong> ₹ {discountAmount ? discountAmount.toLocaleString() : 0}</div>
//         <div className="mb-3"><strong>GST (5%):</strong> ₹ {GST ? GST.toLocaleString() : 0}</div>
//         <div><strong>Total:</strong> ₹ {cartTotal ? cartTotal.toLocaleString() : 0}</div>
//       </div>

//       <div className="buttons mt-4">
//         <button className="btn btn-primary me-3" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-outline-secondary" style={{ backgroundColor: '#1f2e2e', color: 'white' }} onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const Billing = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingDetails, customerDetails } = location.state || {};

//   const {
//     selectedSeats,
//     bus,
//     numPassengers,
//     discountAmount,
//     GST,
//     cartTotal,
//     from,
//     to,
//     fare,
//     bookingDate,
//   } = bookingDetails || {};

//   const [passengerDetails, setPassengerDetails] = useState(
//     Array.from({ length: numPassengers || 0 }, () => ({ name: '', age: '', gender: '' }))
//   );

//   const [email, setEmail] = useState('');

//   const handlePassengerChange = (index, field, value) => {
//     const updatedDetails = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedDetails);
//   };

//   const validatePassengerDetails = () => {
//     for (const passenger of passengerDetails) {
//       if (!passenger.name || !passenger.age || !passenger.gender) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleConfirmBooking = async () => {
//     if (!validatePassengerDetails()) {
//       alert('Please fill in all passenger details.');
//       return;
//     }

//     const bookingData = {
//       customerName: customerDetails?.name || 'N/A',
//       phoneNumber: customerDetails?.phoneNumber || 'N/A',
//       email: email || customerDetails?.email || 'N/A',
//       address: customerDetails?.address || 'N/A',
//       busId: bus?.busId || 'N/A',
//       selectedSeats: selectedSeats || [],
//       passenger_details: passengerDetails,
//       discountAmount: discountAmount || 0,
//       GST: GST || 0,
//       cartTotal: cartTotal || 0,
//       from,
//       to,
//       fare,
//       busType: bus?.busType || 'N/A',
//       bookingDate: bookingDate || 'N/A',
//     };

//     try {
//       // Generate PDF
//       const pdfBlob = await generatePDF(bookingData);

//       // Send email with PDF attachment
//       await sendEmail(bookingData.email, pdfBlob);

//       alert('Booking confirmed successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error confirming booking:', error);
//       alert('Failed to confirm booking. Please try again.');
//     }
//   };

//   const generatePDF = async (bookingData) => {
//     const doc = new jsPDF();
//     doc.setFontSize(22);
//     doc.text('Journey - Jet', 105, 20, 'center');
//     doc.setFontSize(18);
//     doc.text('Invoice', 105, 35, 'center');

//     // Bus details section
//     doc.text('Bus Details:', 20, 100);
//     doc.autoTable({
//       startY: 105,
//       head: [['Attribute', 'Value']],
//       body: [
//         ['Bus Name', bus.busName],
//         ['Bus Number', bus.busNumber],
//         ['From', bookingData.from],
//         ['To', bookingData.to],
//         ['Type', bus.busType],
//         ['Departure', new Date(bus.departure).toLocaleString()],
//         ['Arrival', new Date(bus.arrival).toLocaleString()],
//         ['Fare', `₹ ${bookingData.fare.toLocaleString()}`],
//         ['Selected Seats', bookingData.selectedSeats.join(', ')],
//         ['Number of Passengers', bookingData.passenger_details.length.toString()],
//         ['Booking Date', new Date(bookingData.bookingDate).toLocaleDateString()],
//       ],
//       didDrawPage: (data) => {
//         // Add page numbers
//         doc.setFontSize(12);
//         doc.text(
//           'Page ' + doc.internal.getNumberOfPages(),
//           data.settings.margin.left,
//           doc.internal.pageSize.height - 10
//         );
//       },
//     });

//     // Totals section
//     doc.setFontSize(16);
//     doc.text(`Discount: ₹ ${bookingData.discountAmount.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 20);
//     doc.text(`GST (5%): ₹ ${bookingData.GST.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 40);
//     doc.text(`Total: ₹ ${bookingData.cartTotal.toLocaleString()}`, 20, doc.autoTable.previous.finalY + 60);

//     // Save PDF with a professional filename
//     const pdfBlob = doc.output('blob');
//     doc.save(`JourneyJet_Invoice_${bookingData.customerName.replace(/\s/g, '_')}.pdf`);

//     return pdfBlob;
//   };

//   const sendEmail = async (recipientEmail, pdfBlob) => {
//     try {
//       const formData = new FormData();
//       formData.append('recipientEmail', recipientEmail);
//       formData.append('invoice', pdfBlob, `JourneyJet_Invoice_${customerDetails.name.replace(/\s/g, '_')}.pdf`);

//       const emailResponse = await fetch('http://localhost:3000/email', {
//         method: 'POST',
//         body: formData,
//       });

//       if (emailResponse.ok) {
//         console.log('Email sent successfully.');
//         alert('Email sent successfully!');
//       } else {
//         const emailErrorData = await emailResponse.json();
//         console.error('Email sending error:', emailErrorData);
//         alert('Failed to send email. Please check server logs for details.');
//       }
//     } catch (emailError) {
//       console.error('Error sending email:', emailError);
//       alert('An error occurred while sending the email. Please try again later.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mb-4">Booking Confirmation</h2>

//       {customerDetails && (
//         <div className="mb-4">
//           <h4>Customer Details:</h4>
//           <p><strong>Name:</strong> {customerDetails.name}</p>
//           <p><strong>Phone Number:</strong> {customerDetails.phoneNumber}</p>
//           <p><strong>Email:</strong> {customerDetails.email}</p>
//           <p><strong>Address:</strong> {customerDetails.address}</p>
//         </div>
//       )}

//       {bus && (
//         <div className="mb-4">
//           <h4>Bus Details:</h4>
//           <table className="table table-bordered">
//             <tbody>
//               <tr>
//                 <th>Bus Name</th>
//                 <td>{bus.busName}</td>
//               </tr>
//               <tr>
//                 <th>Bus Number</th>
//                 <td>{bus.busNumber}</td>
//               </tr>
//               <tr>
//                 <th>From</th>
//                 <td>{from}</td>
//               </tr>
//               <tr>
//                 <th>To</th>
//                 <td>{to}</td>
//               </tr>
//               <tr>
//                 <th>Type</th>
//                 <td>{bus.busType}</td>
//               </tr>
//               <tr>
//                 <th>Departure</th>
//                 <td>{new Date(bus.departure).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Arrival</th>
//                 <td>{new Date(bus.arrival).toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Fare</th>
//                 <td>₹ {fare.toLocaleString()}</td>
//               </tr>
//               <tr>
//                 <th>Selected Seats</th>
//                 <td>{selectedSeats.map(seat => seat + 1).join(', ')}</td>
//               </tr>
//               <tr>
//                 <th>Number of Passengers</th>
//                 <td>{numPassengers}</td>
//               </tr>
//               <tr>
//                 <th>Booking Date</th>
//                 <td>{new Date(bookingDate).toLocaleDateString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mb-4">
//         <h4>Passenger Details:</h4>
//         <table className="table passenger-table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Gender</th>
//             </tr>
//           </thead>
//           <tbody>
//             {passengerDetails.map((passenger, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={passenger.name}
//                     onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={passenger.age}
//                     onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={passenger.gender}
//                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-4">
//         <h4>Email Address:</h4>
//         <input
//           type="email"
//           className="form-control"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//         />
//       </div>

//       <div className="mb-4">
//         <button className="btn btn-primary mr-2" onClick={handleConfirmBooking}>
//           Confirm Booking
//         </button>
//         <button className="btn btn-secondary" onClick={() => navigate('/')}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Billing;
