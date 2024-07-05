

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import BusMap from './BusMap'; // Import the BusMap component
import 'leaflet/dist/leaflet.css';
import BusMap from './BusMap';
// import '../Bus.css'; // Custom CSS for additional styling

import './BusSearch.css';
import MapPage from './BusMap';
// import React from 'react';
// import './bussearch.css';

const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

const Bus = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noBusesFound, setNoBusesFound] = useState(false);
  const [expandedBusId, setExpandedBusId] = useState(null); // State to track expanded bus id
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // State to track if a search was performed

  const navigate = useNavigate();

  const fetchAllBuses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/bus`);
      setBuses(response.data);
    } catch (error) {
      setError('Error fetching bus data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setNoBusesFound(false);
    setIsSearchPerformed(true); // Mark that a search was performed

    try {
      const response = await axios.get(`${API_URL}/bus`, {
        params: { from: pickup, to: dropoff, date }
      });

      if (response.data.length === 0) {
        setNoBusesFound(true);
      } else {
        const busesWithFare = response.data.map(bus => ({
          ...bus,
          fare: bus.totalFare // Use totalFare from backend response
        }));
        setBuses(busesWithFare);
      }
    } catch (error) {
      setError('Error fetching bus data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (bus) => {
    navigate('/bus-details', {
      state: {
        busId: bus.busId,
        from: isSearchPerformed ? pickup : bus.Route.from,
        to: isSearchPerformed ? dropoff : bus.Route.to,
        fare: bus.fare,
        date: isSearchPerformed ? date : getCurrentDate()
      }
    });
  };

  const toggleRoutesDropdown = (busId) => {
    if (expandedBusId === busId) {
      setExpandedBusId(null); // Collapse the dropdown if already expanded
    } else {
      setExpandedBusId(busId); // Expand the dropdown for the selected bus
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container">
      <section className="search-section">
        <div className="row justify-content-center mb-4">
          <div className="col-md-3">
            <label htmlFor="pickup" className="form-label">Pick Up</label>
            <input
              type="text"
              id="pickup"
              className="form-control"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="dropoff" className="form-label">Drop Off</label>
            <input
              type="text"
              id="dropoff"
              className="form-control"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter drop off location"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="datepicker" className="form-label">Select Date</label>
            <input
              type="date"
              id="datepicker"
              className="form-control"
              value={date}
              min={getCurrentDate()} // Set the minimum date to today
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
              className="btn btn-primary btn-block mt-4"
              style={{ backgroundColor: '#1f2e2e' }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      <div>
        <MapPage/>
      </div>

      <hr />


      <section className="results-section">
        {error && <div className="alert alert-danger">{error}</div>}

        {noBusesFound && <div className="alert alert-warning">No buses available for the selected criteria.</div>}

        {buses.length > 0 && (
          <div className="row">
            {buses.map(bus => (
              <div key={bus.busId} className="col-md-12 mb-4">
                <div className="card h-100 d-flex flex-column">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="card-title">{bus.busName}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <div className="card-text">
                        {bus.Route && (
                          <>
                            {isSearchPerformed ? (
                              <div>{pickup} - {dropoff}</div> // Wrap in a div instead of nested p tags
                            ) : (
                              <div>{bus.Route.from} - {bus.Route.to}</div>
                            )}
                            <div>{bus.busType}</div>
                          </>
                        )}
                      </div>
                      <div className="card-text">
                        {bus.Route && (
                          <>
                            <small className="text-muted">Departure: {new Date(bus.Route.departure).toLocaleString()}</small><br />
                            <small className="text-muted">Arrival: {new Date(bus.Route.arrival).toLocaleString()}</small>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="card-text">Fare: ₹ {bus.fare}</p>
                      <p className="card-text">Capacity: {bus.capacity}</p>
                      <div>
                        {/* Use onClick to toggle dropdown visibility */}
                        <div className={expandedBusId === bus.busId ? 'show' : 'hide'}>
                          {bus.Route && bus.Route.busRoute && ( // Check if bus.Route and bus.Route.busRoute are defined
                            <div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdownRoutes${bus.busId}`} data-bs-toggle="dropdown" aria-expanded="false">
                                Routes Covered
                              </button>
                              <ul className="dropdown-menu" aria-labelledby={`dropdownRoutes${bus.busId}`}>
                                {bus.Route.busRoute.map((route, index) => (
                                  <li key={index}><span>{route}</span></li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={() => handleBookNow(bus)}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && buses.length === 0 && (
          <div className="row">
            <div className="col">
              <p className="text-center">No buses available.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Bus;



//working up
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Bus.css'; // Custom CSS for additional styling

// const API_URL = 'http://localhost:3000'; // Adjust this URL to match your backend URL

// const BusSearch = () => {
//   const [pickup, setPickup] = useState('');
//   const [dropoff, setDropoff] = useState('');
//   const [date, setDate] = useState('');
//   const [buses, setBuses] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [noBusesFound, setNoBusesFound] = useState(false);
//   const [expandedBusId, setExpandedBusId] = useState(null); // State to track expanded bus id

//   const navigate = useNavigate();

//   const fetchAllBuses = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`${API_URL}/bus`);
//       setBuses(response.data);
//     } catch (error) {
//       setError('Error fetching bus data. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllBuses();
//   }, []);

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setError(null);
//     setNoBusesFound(false);

//     try {
//       const response = await axios.get(`${API_URL}/bus`, {
//         params: { from: pickup, to: dropoff, date }
//       });

//       if (response.data.length === 0) {
//         setNoBusesFound(true);
//       } else {
//         const busesWithFare = response.data.map(bus => ({
//           ...bus,
//           fare: bus.totalFare // Use totalFare from backend response
//         }));
//         setBuses(busesWithFare);
//       }
//     } catch (error) {
//       setError('Error fetching bus data. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBookNow = (bus) => {
//     navigate('/bus-details', { state: { busId: bus.busId, pickup, dropoff, date, totalFare: bus.fare } });
//   };

//   const toggleRoutesDropdown = (busId) => {
//     setExpandedBusId(expandedBusId === busId ? null : busId); // Toggle dropdown
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   return (
//     <div className="container">
//       <section className="search-section">
//         <div className="row justify-content-center mb-4">
//           <div className="col-md-3">
//             <label htmlFor="pickup" className="form-label">Pick Up</label>
//             <input
//               type="text"
//               id="pickup"
//               className="form-control"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//               placeholder="Enter pickup location"
//             />
//           </div>
//           <div className="col-md-3">
//             <label htmlFor="dropoff" className="form-label">Drop Off</label>
//             <input
//               type="text"
//               id="dropoff"
//               className="form-control"
//               value={dropoff}
//               onChange={(e) => setDropoff(e.target.value)}
//               placeholder="Enter drop off location"
//             />
//           </div>
//           <div className="col-md-3">
//             <label htmlFor="datepicker" className="form-label">Select Date</label>
//             <input
//               type="date"
//               id="datepicker"
//               className="form-control"
//               value={date}
//               min={getCurrentDate()} // Set the minimum date to today
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <button
//               type="button"
//               onClick={handleSearch}
//               disabled={isLoading}
//               className="btn btn-primary btn-block mt-4"
//               style={{ backgroundColor: '#1f2e2e' }}
//             >
//               {isLoading ? 'Searching...' : 'Search'}
//             </button>
//           </div>
//         </div>
//       </section>

//       <hr />

//       <section className="results-section">
//         {error && <div className="alert alert-danger">{error}</div>}

//         {noBusesFound && <div className="alert alert-warning">No buses available for the selected criteria.</div>}

//         {buses.length > 0 && (
//           <div className="row">
//             {buses.map(bus => (
//               <div key={bus.busId} className="col-md-12 mb-4">
//                 <div className="card h-100 d-flex flex-column">
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between mb-3">
//                       <h5 className="card-title">{bus.busName}</h5>
//                       <h6 className="card-subtitle mb-2 text-muted">{bus.busNumber}</h6>
//                     </div>

//                     <div className="d-flex justify-content-between mb-3">
//                       <div>
//                         {bus.Route && (
//                           <>
//                             <p>{bus.Route.from} - {bus.Route.to}</p>
//                             <p>{bus.busType}</p>
//                           </>
//                         )}
//                       </div>
//                       <div>
//                         {bus.Route && (
//                           <>
//                             <small className="text-muted">Departure: {new Date(bus.Route.departure).toLocaleString()}</small><br />
//                             <small className="text-muted">Arrival: {new Date(bus.Route.arrival).toLocaleString()}</small>
//                           </>
//                         )}
//                       </div>
//                     </div>

//                     <div className="d-flex justify-content-between">
//                       <p className="card-text">Fare: ₹ {bus.fare}</p>
//                       <p className="card-text">Capacity: {bus.capacity}</p>
//                       <div>
//                         {/* Use onClick to toggle dropdown visibility */}
//                         <div className={expandedBusId === bus.busId ? 'show' : 'hide'}>
//                           {bus.Route && bus.Route.busRoute && ( // Check if bus.Route and bus.Route.busRoute are defined
//                             <div className="dropdown">
//                               <button className="btn btn-secondary dropdown-toggle" type="button" onClick={() => toggleRoutesDropdown(bus.busId)}>
//                                 Routes Covered
//                               </button>
//                               {expandedBusId === bus.busId && (
//                                 <ul className="dropdown-menu show">
//                                   {bus.Route.busRoute.map((route, index) => (
//                                     <li key={index}><span>{route}</span></li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <button className="btn btn-primary" style={{ backgroundColor: '#1f2e2e' }} onClick={() => handleBookNow(bus)}>Book Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!isLoading && buses.length === 0 && (
//           <div className="row">
//             <div className="col">
//               <p className="text-center">No buses available.</p>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default BusSearch;
