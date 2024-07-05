// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Alert } from 'react-bootstrap';

// function ProductForm() {
//     const [formData, setFormData] = useState({
//         busName: '',
//         busNumber: '',
//         capacity: '',
//         busType: '',
//         numberOfSeats: '',
//         contactNumber: '',
//         from: '',
//         to: '',
//         busRoute: [],
//         busRouteTimes: [],
//         busRouteFares: [],
//         numOfSeats: '',
//         runsOnDays: [],
//         departure: '',
//         arrival: '',
//         facilities: [],
//         fare: '',
//         reviews: [],
//         datesAvailable: []
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:3000/bus', formData);
//             setMessage('Bus created successfully!');
//             setError('');
//             clearForm();
//         } catch (error) {
//             setMessage('');
//             setError('Error creating bus. Please try again.');
//         }
//     };

//     const clearForm = () => {
//         setFormData({
//             busName: '',
//             busNumber: '',
//             capacity: '',
//             busType: '',
//             numberOfSeats: '',
//             contactNumber: '',
//             from: '',
//             to: '',
//             busRoute: [],
//             busRouteTimes: [],
//             busRouteFares: [],
//             numOfSeats: '',
//             runsOnDays: [],
//             departure: '',
//             arrival: '',
//             facilities: [],
//             fare: '',
//             reviews: [],
//             datesAvailable: []
//         });
//     };

//     return (
//         <Container fluid>
//             <h1>Create a New Bus</h1>
//             {message && <Alert variant="success">{message}</Alert>}
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="busName">
//                     <Form.Label>Bus Name</Form.Label>
//                     <Form.Control type="text" name="busName" value={formData.busName} onChange={handleChange} placeholder="Enter bus name" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busNumber">
//                     <Form.Label>Bus Number</Form.Label>
//                     <Form.Control type="text" name="busNumber" value={formData.busNumber} onChange={handleChange} placeholder="Enter bus number" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="capacity">
//                     <Form.Label>Capacity</Form.Label>
//                     <Form.Control type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Enter capacity" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busType">
//                     <Form.Label>Bus Type</Form.Label>
//                     <Form.Control type="text" name="busType" value={formData.busType} onChange={handleChange} placeholder="Enter bus type" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="numberOfSeats">
//                     <Form.Label>Number of Seats</Form.Label>
//                     <Form.Control type="number" name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} placeholder="Enter number of seats" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="contactNumber">
//                     <Form.Label>Contact Number</Form.Label>
//                     <Form.Control type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter contact number" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="from">
//                     <Form.Label>From</Form.Label>
//                     <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Enter departure location" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="to">
//                     <Form.Label>To</Form.Label>
//                     <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Enter destination location" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busRoute">
//                     <Form.Label>Bus Route</Form.Label>
//                     <Form.Control type="text" name="busRoute" value={formData.busRoute.join(',')} onChange={handleChange} placeholder="Enter bus route (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busRouteTimes">
//                     <Form.Label>Bus Route Times</Form.Label>
//                     <Form.Control type="text" name="busRouteTimes" value={formData.busRouteTimes.join(',')} onChange={handleChange} placeholder="Enter bus route times (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busRouteFares">
//                     <Form.Label>Bus Route Fares</Form.Label>
//                     <Form.Control type="text" name="busRouteFares" value={formData.busRouteFares.join(',')} onChange={handleChange} placeholder="Enter bus route fares (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="numOfSeats">
//                     <Form.Label>Number of Seats Available</Form.Label>
//                     <Form.Control type="number" name="numOfSeats" value={formData.numOfSeats} onChange={handleChange} placeholder="Enter number of seats available" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="runsOnDays">
//                     <Form.Label>Runs On Days</Form.Label>
//                     <Form.Control type="text" name="runsOnDays" value={formData.runsOnDays.join(',')} onChange={handleChange} placeholder="Enter days the bus runs (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="departure">
//                     <Form.Label>Departure Time</Form.Label>
//                     <Form.Control type="text" name="departure" value={formData.departure} onChange={handleChange} placeholder="Enter departure time" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="arrival">
//                     <Form.Label>Arrival Time</Form.Label>
//                     <Form.Control type="text" name="arrival" value={formData.arrival} onChange={handleChange} placeholder="Enter arrival time" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="facilities">
//                     <Form.Label>Facilities</Form.Label>
//                     <Form.Control type="text" name="facilities" value={formData.facilities.join(',')} onChange={handleChange} placeholder="Enter facilities available (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="fare">
//                     <Form.Label>Fare</Form.Label>
//                     <Form.Control type="text" name="fare" value={formData.fare} onChange={handleChange} placeholder="Enter fare per seat" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="reviews">
//                     <Form.Label>Reviews</Form.Label>
//                     <Form.Control type="text" name="reviews" value={formData.reviews.join(',')} onChange={handleChange} placeholder="Enter reviews (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="datesAvailable">
//                     <Form.Label>Dates Available</Form.Label>
//                     <Form.Control type="text" name="datesAvailable" value={formData.datesAvailable.join(',')} onChange={handleChange} placeholder="Enter dates available for booking (comma-separated)" />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Create Bus
//                 </Button>
//             </Form>
//         </Container>
//     );
// }

// export default ProductForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Alert } from 'react-bootstrap';

// function ProductForm() {
//     const [formData, setFormData] = useState({
//         busName: '',
//         busNumber: '',
//         capacity: '',
//         busType: '',
//         numberOfSeats: '',
//         contactNumber: '',
//         from: '',
//         to: '',
//         busRoute: '',
//         busRouteTimes: '',
//         busRouteFares: '',
//         numOfSeats: '',
//         runsOnDays: '',
//         departure: '',
//         arrival: '',
//         facilities: '',
//         fare: '',
//         reviews: '',
//         datesAvailable: ''
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const formattedData = {
//             ...formData,
//             departure: formData.departure ? formData.departure.toISOString() : null,
//             arrival: formData.arrival ? formData.arrival.toISOString() : null,
//             busRoute: formData.busRoute.split(',').map(item => item.trim()),
//             busRouteTimes: formData.busRouteTimes.split(',').map(item => item.trim()),
//             busRouteFares: formData.busRouteFares.split(',').map(item => item.trim()),
//             runsOnDays: formData.runsOnDays.split(',').map(item => item.trim()),
//             facilities: formData.facilities.split(',').map(item => item.trim()),
//             reviews: formData.reviews.split(',').map(item => item.trim()),
//             datesAvailable: formData.datesAvailable.split(',').map(item => item.trim())
//         };
    
//         try {
//             const response = await axios.post('http://localhost:3000/bus', formattedData);
//             console.log('Response:', response.data); // Log the response data for debugging
//             setMessage('Bus created successfully!');
//             setError('');
//             clearForm();
//         } catch (error) {
//             setMessage('');
//             setError('Error creating bus. Please try again.');
//             console.error('Error:', error); // Log the error for further investigation
//         }
//     };

//     const clearForm = () => {
//         setFormData({
//             busName: '',
//             busNumber: '',
//             capacity: '',
//             busType: '',
//             numberOfSeats: '',
//             contactNumber: '',
//             from: '',
//             to: '',
//             busRoute: '',
//             busRouteTimes: '',
//             busRouteFares: '',
//             numOfSeats: '',
//             runsOnDays: '',
//             departure: '',
//             arrival: '',
//             facilities: '',
//             fare: '',
//             reviews: '',
//             datesAvailable: ''
//         });
//     };

//     return (
//         <Container fluid>
//             <h1>Create a New Bus</h1>
//             {message && <Alert variant="success">{message}</Alert>}
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="busName">
//                     <Form.Label>Bus Name</Form.Label>
//                     <Form.Control type="text" name="busName" value={formData.busName} onChange={handleChange} placeholder="Enter bus name" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busNumber">
//                     <Form.Label>Bus Number</Form.Label>
//                     <Form.Control type="text" name="busNumber" value={formData.busNumber} onChange={handleChange} placeholder="Enter bus number" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="capacity">
//                     <Form.Label>Capacity</Form.Label>
//                     <Form.Control type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Enter capacity" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busType">
//                     <Form.Label>Bus Type</Form.Label>
//                     <Form.Control type="text" name="busType" value={formData.busType} onChange={handleChange} placeholder="Enter bus type" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="numberOfSeats">
//                     <Form.Label>Number of Seats</Form.Label>
//                     <Form.Control type="number" name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} placeholder="Enter number of seats" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="contactNumber">
//                     <Form.Label>Contact Number</Form.Label>
//                     <Form.Control type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter contact number" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="from">
//                     <Form.Label>From</Form.Label>
//                     <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Enter departure location" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="to">
//                     <Form.Label>To</Form.Label>
//                     <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Enter destination location" required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busRoute">
//                     <Form.Label>Bus Route</Form.Label>
//                     <Form.Control type="text" name="busRoute" value={formData.busRoute} onChange={handleChange} placeholder="Enter bus route (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busRouteTimes">
//                     <Form.Label>Bus Route Times</Form.Label>
//                     <Form.Control type="text" name="busRouteTimes" value={formData.busRouteTimes} onChange={handleChange} placeholder="Enter bus route times (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="busRouteFares">
//                     <Form.Label>Bus Route Fares</Form.Label>
//                     <Form.Control type="text" name="busRouteFares" value={formData.busRouteFares} onChange={handleChange} placeholder="Enter bus route fares (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="numOfSeats">
//                     <Form.Label>Number of Seats Available</Form.Label>
//                     <Form.Control type="number" name="numOfSeats" value={formData.numOfSeats} onChange={handleChange} placeholder="Enter number of seats available" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="runsOnDays">
//                     <Form.Label>Runs On Days</Form.Label>
//                     <Form.Control type="text" name="runsOnDays" value={formData.runsOnDays} onChange={handleChange} placeholder="Enter days the bus runs (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="departure">
//                     <Form.Label>Departure Time</Form.Label>
//                     <Form.Control type="text" name="departure" value={formData.departure} onChange={handleChange} placeholder="Enter departure time" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="arrival">
//                     <Form.Label>Arrival Time</Form.Label>
//                     <Form.Control type="text" name="arrival" value={formData.arrival} onChange={handleChange} placeholder="Enter arrival time" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="facilities">
//                     <Form.Label>Facilities</Form.Label>
//                     <Form.Control type="text" name="facilities" value={formData.facilities} onChange={handleChange} placeholder="Enter facilities available (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="fare">
//                     <Form.Label>Fare</Form.Label>
//                     <Form.Control type="text" name="fare" value={formData.fare} onChange={handleChange} placeholder="Enter fare per seat" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="reviews">
//                     <Form.Label>Reviews</Form.Label>
//                     <Form.Control type="text" name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Enter reviews (comma-separated)" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="datesAvailable">
//                     <Form.Label>Dates Available</Form.Label>
//                     <Form.Control type="text" name="datesAvailable" value={formData.datesAvailable} onChange={handleChange} placeholder="Enter dates available for booking (comma-separated)" />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Create Bus
//                 </Button>
//             </Form>
//         </Container>
//     );
// }

// export default ProductForm;
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function BusCreate() {
    const [formData, setFormData] = useState({
        busName: '',
        busNumber: '',
        capacity: '',
        busType: '',
        numberOfSeats: '',
        contactNumber: '',
        from: '',
        to: '',
        busRoute: '',
        busRouteTimes: '',
        busRouteFares: '',
        numOfSeats: '',
        runsOnDays: '',
        departure: '',
        arrival: '',
        facilities: '',
        fare: '',
        reviews: '',
        datesAvailable: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            departure: formData.departure ? new Date(formData.departure).toISOString() : null,
            arrival: formData.arrival ? new Date(formData.arrival).toISOString() : null,
            busRoute: formData.busRoute.split(',').map(item => item.trim()),
            busRouteTimes: formData.busRouteTimes.split(',').map(item => item.trim()),
            busRouteFares: formData.busRouteFares.split(',').map(item => item.trim()),
            runsOnDays: formData.runsOnDays.split(',').map(item => item.trim()),
            facilities: formData.facilities.split(',').map(item => item.trim()),
            reviews: formData.reviews.split(',').map(item => item.trim()),
            datesAvailable: formData.datesAvailable.split(',').map(item => item.trim())
        };

        try {
            const response = await axios.post('http://localhost:3000/bus', formattedData);
            console.log('Response:', response.data); // Log the response data for debugging
            setMessage('Bus created successfully!');
            setError('');
            clearForm();
        } catch (error) {
            setMessage('');
            setError('Error creating bus. Please try again.');
            console.error('Error:', error); // Log the error for further investigation
        }
    };

    const clearForm = () => {
        setFormData({
            busName: '',
            busNumber: '',
            capacity: '',
            busType: '',
            numberOfSeats: '',
            contactNumber: '',
            from: '',
            to: '',
            busRoute: '',
            busRouteTimes: '',
            busRouteFares: '',
            numOfSeats: '',
            runsOnDays: '',
            departure: '',
            arrival: '',
            facilities: '',
            fare: '',
            reviews: '',
            datesAvailable: ''
        });
    };

    return (
        <Container fluid>
            <h1>Create a New Bus</h1>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="busName">
                    <Form.Label>Bus Name</Form.Label>
                    <Form.Control type="text" name="busName" value={formData.busName} onChange={handleChange} placeholder="Enter bus name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busNumber">
                    <Form.Label>Bus Number</Form.Label>
                    <Form.Control type="text" name="busNumber" value={formData.busNumber} onChange={handleChange} placeholder="Enter bus number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Enter capacity" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busType">
                    <Form.Label>Bus Type</Form.Label>
                    <Form.Control type="text" name="busType" value={formData.busType} onChange={handleChange} placeholder="Enter bus type" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfSeats">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control type="number" name="numberOfSeats" value={formData.numberOfSeats} onChange={handleChange} placeholder="Enter number of seats" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter contact number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="from">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Enter departure location" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="to">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Enter destination location" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRoute">
                    <Form.Label>Bus Route</Form.Label>
                    <Form.Control type="text" name="busRoute" value={formData.busRoute} onChange={handleChange} placeholder="Enter bus route (comma-separated)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRouteTimes">
                    <Form.Label>Bus Route Times</Form.Label>
                    <Form.Control type="text" name="busRouteTimes" value={formData.busRouteTimes} onChange={handleChange} placeholder="Enter bus route times (comma-separated)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="busRouteFares">
                    <Form.Label>Bus Route Fares</Form.Label>
                    <Form.Control type="text" name="busRouteFares" value={formData.busRouteFares} onChange={handleChange} placeholder="Enter bus route fares (comma-separated)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="numOfSeats">
                    <Form.Label>Number of Seats Available</Form.Label>
                    <Form.Control type="number" name="numOfSeats" value={formData.numOfSeats} onChange={handleChange} placeholder="Enter number of seats available" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="runsOnDays">
                    <Form.Label>Runs On Days</Form.Label>
                    <Form.Control type="text" name="runsOnDays" value={formData.runsOnDays} onChange={handleChange} placeholder="Enter days the bus runs (comma-separated)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="departure">
                    <Form.Label>Departure Time</Form.Label>
                    <Form.Control type="datetime-local" name="departure" value={formData.departure} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="arrival">
                    <Form.Label>Arrival Time</Form.Label>
                    <Form.Control type="datetime-local" name="arrival" value={formData.arrival} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="facilities">
                    <Form.Label>Facilities</Form.Label>
                    <Form.Control type="text" name="facilities" value={formData.facilities} onChange={handleChange} placeholder="Enter facilities available (comma-separated)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fare">
                    <Form.Label>Fare</Form.Label>
                    <Form.Control type="text" name="fare" value={formData.fare} onChange={handleChange} placeholder="Enter fare per seat" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="reviews">
                    <Form.Label>Reviews</Form.Label>
                    <Form.Control type="text" name="reviews" value={formData.reviews} onChange={handleChange} placeholder="Enter reviews (comma-separated)" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="datesAvailable">
                    <Form.Label>Dates Available</Form.Label>
                    <Form.Control type="text" name="datesAvailable" value={formData.datesAvailable} onChange={handleChange} placeholder="Enter dates available for booking (comma-separated)" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Bus
                </Button>
            </Form>
        </Container>
    );
}

export default BusCreate;
