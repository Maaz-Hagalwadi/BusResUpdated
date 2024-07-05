// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Toast } from 'react-bootstrap';

// function Update() {
//     const [users, setUsers] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState('');
//     const [selectedUserName, setSelectedUserName] = useState('');
//     const [selectedUserdescription, setSelectedUserdescription] = useState('');
//     const [selectedUserprice, setSelectedUserprice] = useState('');
//     const [selectedUserstockQuantity, setSelectedUserstockQuantity] = useState('');
//     const [selectedUserimageUrl, setSelectedUserimageUrl] = useState('');
//     const [showToast, setShowToast] = useState(false);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('https://capstone-project-qh3r.onrender.com/api/products/');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleUserSelectChange = async (e) => {
//         const userId = e.target.value;
//         setSelectedUserId(userId);

//         try {
//             const response = await axios.get(`https://capstone-project-qh3r.onrender.com/api/products/${userId}`);
//             const userData = response.data;
//             setSelectedUserName(userData.name);
//             setSelectedUserdescription(userData.description);
//             setSelectedUserprice(userData.price);
//             setSelectedUserstockQuantity(userData.stockQuantity);
//             setSelectedUserimageUrl(userData.imageUrl);
//         } catch (error) {
//             console.error('Error fetching user:', error);
//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!selectedUserId) {
//             alert('Please select a user.');
//             return;
//         }

//         try {
//             await axios.put(`https://capstone-project-qh3r.onrender.com/api/products/${selectedUserId}`, {
//                 name: selectedUserName,
//                 description: selectedUserdescription,
//                 price: selectedUserprice,
//                 stockQuantity: selectedUserstockQuantity,
//                 imageUrl:selectedUserimageUrl
//             });
//             setShowToast(true);
//             fetchUsers();
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     return (
//         <Container fluid>
//             <h1>Edit/Update a Product</h1>
//             <Form id="updateForm" onSubmit={handleFormSubmit}>
//                 <Form.Group className="mb-3" controlId="userId">
//                     <Form.Label>Select User ID</Form.Label>
//                     <Form.Control as="select" value={selectedUserId} onChange={handleUserSelectChange}>
//                         <option value="">Select User ID</option>
//                         {users.map(user => (
//                             <option key={user.id} value={user.id}>{user.id}</option>
//                         ))}
//                     </Form.Control>
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" placeholder="Enter name" value={selectedUserName} onChange={(e) => setSelectedUserName(e.target.value)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="description">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control type="text" placeholder="Enter description)" value={selectedUserdescription} onChange={(e) => setSelectedUserdescription(e.target.value)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="price">
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control type="number" placeholder="Enter price" value={selectedUserprice} onChange={(e) => setSelectedUserprice(e.target.value)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="stockQuantity">
//                     <Form.Label>StockQuantity</Form.Label>
//                     <Form.Control type="number" placeholder="Enter stockQuantity" value={selectedUserstockQuantity} onChange={(e) => setSelectedUserstockQuantity(e.target.value)} />
//                 </Form.Group>
                
//                 <Form.Group className="mb-3" controlId="imageUrl">
//                     <Form.Label>ImageUrl</Form.Label>
//                     <Form.Control type="text" placeholder="Enter imageUrl" value={selectedUserimageUrl} onChange={(e) => setSelectedUserimageUrl(e.target.value)} />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Update
//                 </Button>
//             </Form>

//             <div className="toast-container position-fixed bottom-0 end-0 p-3">
//                 <Toast show={showToast} onClose={() => setShowToast(false)}>
//                     <Toast.Header>
//                         <strong className="me-auto">Update User</strong>
//                         <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
//                     </Toast.Header>
//                     <Toast.Body>User updated successfully!</Toast.Body>
//                 </Toast>
//             </div>
//         </Container>
//     );
// }

// export default Update;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Toast } from 'react-bootstrap';

function Update() {
    const [buses, setBuses] = useState([]);
    const [selectedBusId, setSelectedBusId] = useState('');
    const [selectedBusName, setSelectedBusName] = useState('');
    const [selectedBusNumber, setSelectedBusNumber] = useState('');
    const [selectedCapacity, setSelectedCapacity] = useState('');
    const [selectedBusType, setSelectedBusType] = useState('');
    const [selectedNumberOfSeats, setSelectedNumberOfSeats] = useState('');
    const [selectedContactNumber, setSelectedContactNumber] = useState('');
    const [selectedFrom, setSelectedFrom] = useState('');
    const [selectedTo, setSelectedTo] = useState('');
    const [selectedBusRoute, setSelectedBusRoute] = useState('');
    const [selectedBusRouteTimes, setSelectedBusRouteTimes] = useState('');
    const [selectedBusRouteFares, setSelectedBusRouteFares] = useState('');
    const [selectedNumOfSeats, setSelectedNumOfSeats] = useState('');
    const [selectedRunsOnDays, setSelectedRunsOnDays] = useState('');
    const [selectedDeparture, setSelectedDeparture] = useState('');
    const [selectedArrival, setSelectedArrival] = useState('');
    const [selectedFacilities, setSelectedFacilities] = useState('');
    const [selectedFare, setSelectedFare] = useState('');
    const [selectedReviews, setSelectedReviews] = useState('');
    const [selectedDatesAvailable, setSelectedDatesAvailable] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/bus');
            setBuses(response.data);
        } catch (error) {
            console.error('Error fetching buses:', error);
        }
    };

    const handleBusSelectChange = async (e) => {
        const busId = e.target.value;
        setSelectedBusId(busId);

        try {
            const response = await axios.get(`http://localhost:3000/bus/${busId}`);
            const busData = response.data;
            setSelectedBusName(busData.busName);
            setSelectedBusNumber(busData.busNumber);
            setSelectedCapacity(busData.capacity);
            setSelectedBusType(busData.busType);
            setSelectedNumberOfSeats(busData.numberOfSeats);
            setSelectedContactNumber(busData.contactNumber);
            setSelectedFrom(busData.Route.from);
            setSelectedTo(busData.Route.to);
            setSelectedBusRoute(busData.Route.busRoute.join(', '));
            setSelectedBusRouteTimes(busData.Route.busRouteTimes.join(', '));
            setSelectedBusRouteFares(busData.Route.busRouteFares.join(', '));
            setSelectedNumOfSeats(busData.numOfSeats);
            setSelectedRunsOnDays(busData.Route.runsOnDays.join(', '));
            setSelectedDeparture(busData.Route.departure);
            setSelectedArrival(busData.Route.arrival);
            setSelectedFacilities(busData.Facility.facilities.join(', '));
            setSelectedFare(busData.fare);
            setSelectedReviews(busData.reviews.join(', '));
            setSelectedDatesAvailable(busData.Availability.datesAvailable.join(', '));
        } catch (error) {
            console.error('Error fetching bus:', error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBusId) {
            alert('Please select a bus.');
            return;
        }

        try {
            await axios.put(`http://localhost:3000/bus/${selectedBusId}`, {
                busName: selectedBusName,
                busNumber: selectedBusNumber,
                capacity: selectedCapacity,
                busType: selectedBusType,
                numberOfSeats: selectedNumberOfSeats,
                contactNumber: selectedContactNumber,
                from: selectedFrom,
                to: selectedTo,
                busRoute: selectedBusRoute.split(',').map(item => item.trim()),
                busRouteTimes: selectedBusRouteTimes.split(',').map(item => item.trim()),
                busRouteFares: selectedBusRouteFares.split(',').map(item => item.trim()),
                numOfSeats: selectedNumOfSeats,
                runsOnDays: selectedRunsOnDays.split(',').map(item => item.trim()),
                departure: selectedDeparture,
                arrival: selectedArrival,
                facilities: selectedFacilities.split(',').map(item => item.trim()),
                fare: selectedFare,
                reviews: selectedReviews.split(',').map(item => item.trim()),
                datesAvailable: selectedDatesAvailable.split(',').map(item => item.trim())
            });
            setShowToast(true);
            fetchBuses();
        } catch (error) {
            console.error('Error updating bus:', error);
        }
    };

    return (
        <Container fluid>
            <h1>Edit/Update a Bus</h1>
            <Form id="updateForm" onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="busId">
                    <Form.Label>Select Bus ID</Form.Label>
                    <Form.Control as="select" value={selectedBusId} onChange={handleBusSelectChange}>
                        <option value="">Select Bus ID</option>
                        {buses.map(bus => (
                            <option key={bus.busId} value={bus.busId}>{bus.busId}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="busName">
                    <Form.Label>Bus Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter bus name" value={selectedBusName} onChange={(e) => setSelectedBusName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busNumber">
                    <Form.Label>Bus Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter bus number" value={selectedBusNumber} onChange={(e) => setSelectedBusNumber(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" placeholder="Enter capacity" value={selectedCapacity} onChange={(e) => setSelectedCapacity(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busType">
                    <Form.Label>Bus Type</Form.Label>
                    <Form.Control type="text" placeholder="Enter bus type" value={selectedBusType} onChange={(e) => setSelectedBusType(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfSeats">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of seats" value={selectedNumberOfSeats} onChange={(e) => setSelectedNumberOfSeats(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter contact number" value={selectedContactNumber} onChange={(e) => setSelectedContactNumber(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="from">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="text" placeholder="Enter departure location" value={selectedFrom} onChange={(e) => setSelectedFrom(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="to">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="text" placeholder="Enter destination location" value={selectedTo} onChange={(e) => setSelectedTo(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRoute">
                    <Form.Label>Bus Route</Form.Label>
                    <Form.Control type="text" placeholder="Enter bus route (comma-separated)" value={selectedBusRoute} onChange={(e) => setSelectedBusRoute(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRouteTimes">
                    <Form.Label>Bus Route Times</Form.Label>
                    <Form.Control type="text" placeholder="Enter bus route times (comma-separated)" value={selectedBusRouteTimes} onChange={(e) => setSelectedBusRouteTimes(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRouteFares">
                    <Form.Label>Bus Route Fares</Form.Label>
                    <Form.Control type="text" placeholder="Enter bus route fares (comma-separated)" value={selectedBusRouteFares} onChange={(e) => setSelectedBusRouteFares(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="numOfSeats">
                    <Form.Label>Number of Seats Available</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of seats available" value={selectedNumOfSeats} onChange={(e) => setSelectedNumOfSeats(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="runsOnDays">
                    <Form.Label>Runs On Days</Form.Label>
                    <Form.Control type="text" placeholder="Enter days the bus runs (comma-separated)" value={selectedRunsOnDays} onChange={(e) => setSelectedRunsOnDays(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="departure">
                    <Form.Label>Departure Time</Form.Label>
                    <Form.Control type="text" placeholder="Enter departure time" value={selectedDeparture} onChange={(e) => setSelectedDeparture(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="arrival">
                    <Form.Label>Arrival Time</Form.Label>
                    <Form.Control type="text" placeholder="Enter arrival time" value={selectedArrival} onChange={(e) => setSelectedArrival(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="facilities">
                    <Form.Label>Facilities</Form.Label>
                    <Form.Control type="text" placeholder="Enter facilities available (comma-separated)" value={selectedFacilities} onChange={(e) => setSelectedFacilities(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fare">
                    <Form.Label>Fare</Form.Label>
                    <Form.Control type="text" placeholder="Enter fare per seat" value={selectedFare} onChange={(e) => setSelectedFare(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="reviews">
                    <Form.Label>Reviews</Form.Label>
                    <Form.Control type="text" placeholder="Enter reviews (comma-separated)" value={selectedReviews} onChange={(e) => setSelectedReviews(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="datesAvailable">
                    <Form.Label>Dates Available</Form.Label>
                    <Form.Control type="text" placeholder="Enter dates available for booking (comma-separated)" value={selectedDatesAvailable} onChange={(e) => setSelectedDatesAvailable(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Bus
                </Button>
            </Form>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Update Bus</strong>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                    </Toast.Header>
                    <Toast.Body>Bus updated successfully!</Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}

export default Update;

                   
