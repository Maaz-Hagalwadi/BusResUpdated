
// import React from 'react';
// import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
// import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
// import BusSearch from './BusSearch';
// import BusDetails from './BusDetails';
// import Billing from './Billing';

// function App2() {
//   return (

//       <div className="container-fluid p-0"> {/* Add 'p-0' to remove default padding */}
//         <div className="flex-row">
//           {/* Apply a separate background color to the navbar */}
//           <Navbar expand="lg" bg="primary" variant="dark" style={{ borderBottom: '1px solid #ccc', width: '100%' }}>
//             <Container fluid> {/* Set fluid attribute to make the container fit the width of its parent */}
//               <Navbar.Brand href="#">GK Inventory Billing App</Navbar.Brand>
//               <Navbar.Toggle aria-controls="navbarNavDropdown" />
//               <Navbar.Collapse id="navbarNavDropdown">
//                 <Nav className="me-auto mb-2 mb-lg-0">
//                   <Link to="/" className="nav-link">Home</Link>
//                   <Link to="/billing" className="nav-link">Invoice</Link>     
//                 </Nav>
//                 <Form className="d-flex">
//                   <FormControl
//                     type="search"
//                     placeholder="Search"
//                     className="me-2"
//                     aria-label="Search"
//                   />
//                   <Button variant="outline-success">Search</Button>
//                 </Form>
//               </Navbar.Collapse>
//             </Container>
//           </Navbar>
//         </div>
//         <Routes>
//           <Route path="/" element={<BusSearch />} />
//           <Route path="/bus-details" element={<BusDetails />} />
//           <Route path="/billing" element={<Billing />} />
//         </Routes>
//       </div>
   
//   );
// }

// export default App2;
// import React from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
// import BusSearch from '../BusSearch';
// import BusDetails from './BusDetails';
// import Billing from './Billing';

// function App2() {
//   return (
//     <div className="container-fluid p-0">
//       <Navbar expand="lg" variant="dark" style={{ borderBottom: '1px solid #ccc', backgroundColor: '#3d5c5c', position: 'fixed', zIndex: '100', top: '0', width: '100%' }}>
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/">GK Inventory Billing App</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarNavDropdown" />
//           <Navbar.Collapse id="navbarNavDropdown">
//             <Nav className="me-auto mb-2 mb-lg-0">
//               <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
//               <Nav.Link as={Link} to="/billing" className="nav-link">Invoice</Nav.Link>
//               <Nav.Link as={Link} to="/bus-details" className="nav-link">Bus Details</Nav.Link>
//             </Nav>
//             <Form className="d-flex">
//               <FormControl
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-success">Search</Button>
//             </Form>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Ensure content starts below the fixed Navbar */}
//       <div style={{ paddingTop: '70px' }}>
//         <Routes>
//           <Route path="/" element={<BusSearch />} />
//           <Route path="/bus-details" element={<BusDetails />} />
//           <Route path="/billing" element={<Billing />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App2;

import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa'; // Import the profile icon from react-icons
import Bus from './Components/Bus';
import Info from './Components/Info';
import Payment from './Components/Payment';
import Profile from './Components/profile';

function App2() {
  return (
    <div className="container-fluid p-0">
      <Navbar expand="lg" variant="dark" style={{ borderBottom: '1px solid #ccc', backgroundColor: ' #334d4d', position: 'fixed', zIndex: '100', top: '0', width: '100%' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">JourneyJet Bus Booking</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/billing" className="nav-link">Invoice</Nav.Link>
        
            </Nav>
            <Nav>
              <Button variant="outline-light" as={Link} to="/profile">
                <FaUser style={{ marginRight: '5px' }} />
                Account
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Ensure content starts below the fixed Navbar */}
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Bus />} />
          <Route path="/bus-details" element={<Info />} />
          <Route path="/billing" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App2;
