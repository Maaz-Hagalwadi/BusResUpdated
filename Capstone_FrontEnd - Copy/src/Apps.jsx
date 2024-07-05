
// import React from 'react';
// import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './context/cartContext';
// import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
// import Header from './components/Header';
// import Home from "./Components/Home";
// import Cart from './Components/Cart';
// import CustomerList from './Components/Customer/CustomerList';
// import CustomerForm from './Components/Customer/CustomerForm';
// import CustomerEdit from './Components/Customer/CustomerEdit';
// import CustomerDelete from './Components/Customer/CustomerDelete';
// import ProductList from './Components/Products/ProductList';
// import ProductForm from './Components/Products/ProductForm';
// import ProductEdit from './Components/Products/ProductEdit';
// import ProductDelete from './Components/Products/ProductDelete';
// import ProductsCard from './Components/ProductsCard';
// import BusDetails from './Components/BusDetails';
// import Billing from './Components/Billing';
// import BusSearch from './Components/BusSearch';

// // Now your main component
// function Apps() {
//   return (
//     <CartProvider>
//       <div className="container-fluid p-0"> {/* Add 'p-0' to remove default padding */}
//         <div className="flex-row">
//           {/* Remove extra columns */}
//           {/* Apply a separate background color to the navbar */}
//           <Navbar expand="lg" bg="primary" variant="dark" style={{ borderBottom: '1px solid #ccc', width: '100%' }}>
//             <Container fluid> {/* Set fluid attribute to make the container fit the width of its parent */}
//               <Navbar.Brand href="#">GK Inventory Billing App</Navbar.Brand>
//               <Navbar.Toggle aria-controls="navbarNavDropdown" />
//               <Navbar.Collapse id="navbarNavDropdown">
//                 <Nav className="me-auto mb-2 mb-lg-0">
//                   <Link to="/" className="nav-link">Home</Link>
//                   <Link to="/" className="nav-link">Invoice</Link>


//                   <NavDropdown title="Products" id="navbarScrollingDropdown">
//                     <Link to="/ProductList" className="dropdown-item">View Products</Link>
//                     <Link to="/ProductForm" className="dropdown-item">Create a New Product</Link>
//                     <Link to="/ProductEdit" className="dropdown-item">Edit / Update a Product</Link>
//                     <Link to="/ProductDelete" className="dropdown-item">Delete a Product</Link>
//                   </NavDropdown>
//                   <NavDropdown title="Customers" id="navbarScrollingDropdown">
//                     <Link to="/CustomerList" className="dropdown-item">View Customers</Link>
//                     <Link to="/CustomerForm" className="dropdown-item">Create a New Customer</Link>
//                     <Link to="/EditCustomer" className="dropdown-item">Edit / Update a Customer</Link>
//                     <Link to="/DeleteCustomer" className="dropdown-item">Delete a Customer</Link>
//                   </NavDropdown>
//                 </Nav>

//                 <div style={{ marginRight: '10px' }}>
//                   <Header /> {/* Include Header component */}
//                 </div>

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

//           {/* Remove extra columns */}
//         </div>
//         <Routes>
//           <Route path="/" element={<BusSearch />} />
//           <Route path="/CustomerList" element={<CustomerList />} />
//           <Route path="/CustomerForm" element={<CustomerForm />} />
//           <Route path="/EditCustomer" element={<CustomerEdit />} />
//           <Route path="/DeleteCustomer" element={<CustomerDelete />} />
//           <Route path="/ProductList" element={<ProductList />} />
//           <Route path="/ProductForm" element={<ProductForm />} />
//           <Route path="/ProductDelete" element={<ProductDelete />} />
//           <Route path="/ProductEdit" element={<ProductEdit />} />
//           <Route path="/cart" element={<Cart />} /> {/* Define the route for '/cart' */}
//           <Route path="/bus-details" element={<BusDetails />} />
//           <Route path="/billing" element={<Billing />} />
          
        
//           {/* Add routes for other components */}
//         </Routes>
//       </div>
//     </CartProvider>
//   );
// }

// export default Apps;

// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
// import CustomerList from './Components/Customer/CustomerList';
// import CustomerForm from './Components/Customer/CustomerForm';
// import CustomerEdit from './Components/Customer/CustomerEdit';
// import CustomerDelete from './Components/Customer/CustomerDelete';
// import ProductList from './Components/Products/ProductList';
// import ProductForm from './Components/Products/ProductForm';
// import ProductEdit from './Components/Products/ProductEdit';
// import ProductDelete from './Components/Products/ProductDelete';
// import BusDetails from './Components/BusDetails';
// import Billing from './Components/Billing';
// import BusSearch from './Components/BusSearch';

// function Apps() {
//   return (
//     <div className="container-fluid p-0">
//       <Navbar expand="lg" bg="primary" variant="dark" style={{ borderBottom: '1px solid #ccc', width: '100%' }}>
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/">GK Inventory Billing App</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarNavDropdown" />
//           <Navbar.Collapse id="navbarNavDropdown">
//             <Nav className="me-auto mb-2 mb-lg-0">
//               <Nav.Link as={Link} to="/">Home</Nav.Link>
//               <Nav.Link as={Link} to="/billing">Invoice</Nav.Link>

//               <NavDropdown title="Products" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/ProductList">View Products</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/ProductForm">Create a New Product</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/ProductEdit">Edit / Update a Product</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/ProductDelete">Delete a Product</NavDropdown.Item>
//               </NavDropdown>

//               <NavDropdown title="Customers" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/CustomerList">View Customers</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/CustomerForm">Create a New Customer</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/EditCustomer">Edit / Update a Customer</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/DeleteCustomer">Delete a Customer</NavDropdown.Item>
//               </NavDropdown>
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

//       <Routes>
//         <Route path="/" element={<BusSearch />} />
//         <Route path="/CustomerList" element={<CustomerList />} />
//         <Route path="/CustomerForm" element={<CustomerForm />} />
//         <Route path="/EditCustomer" element={<CustomerEdit />} />
//         <Route path="/DeleteCustomer" element={<CustomerDelete />} />
//         <Route path="/ProductList" element={<ProductList />} />
//         <Route path="/ProductForm" element={<ProductForm />} />
//         <Route path="/ProductDelete" element={<ProductDelete />} />
//         <Route path="/ProductEdit" element={<ProductEdit />} />
      
//         <Route path="/bus-details" element={<BusDetails />} />
//         <Route path="/billing" element={<Billing />} />
//       </Routes>
//     </div>
//   );
// }

// export default Apps;

// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
// import { FaUser } from 'react-icons/fa';  // Import the profile icon from react-icons
// import CustomerList from './Components/Customer/CustomerList';
// import CustomerForm from './Components/Customer/CustomerForm';
// import CustomerEdit from './Components/Customer/CustomerEdit';
// import CustomerDelete from './Components/Customer/CustomerDelete';
// import ProductList from './Components/Products/ProductList';
// import ProductForm from './Components/Products/ProductForm';
// import ProductEdit from './Components/Products/ProductEdit';
// import ProductDelete from './Components/Products/ProductDelete';
// import BusDetails from './Components/BusDetails';
// import Billing from './Components/Billing';
// import BusSearch from './Components/BusSearch';
// import Profile from './Components/profile';

// function Apps() {
//   return (
//     <div className="container-fluid p-0">
//       <Navbar expand="lg"  variant="dark" style={{ borderBottom: '1px solid #ccc', width: '100%',backgroundColor: '#3d5c5c' }}>
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/">GK Inventory Billing App</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarNavDropdown" />
//           <Navbar.Collapse id="navbarNavDropdown">
//             <Nav className="me-auto mb-2 mb-lg-0">
//               <Nav.Link as={Link} to="/">Home</Nav.Link>
//               <Nav.Link as={Link} to="/billing">Invoice</Nav.Link>

//               <NavDropdown title="Products" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/ProductList">View Products</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/ProductForm">Create a New Product</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/ProductEdit">Edit / Update a Product</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/ProductDelete">Delete a Product</NavDropdown.Item>
//               </NavDropdown>

//               <NavDropdown title="Customers" id="navbarScrollingDropdown">
//                 <NavDropdown.Item as={Link} to="/CustomerList">View Customers</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/CustomerForm">Create a New Customer</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/EditCustomer">Edit / Update a Customer</NavDropdown.Item>
//                 <NavDropdown.Item as={Link} to="/DeleteCustomer">Delete a Customer</NavDropdown.Item>
//               </NavDropdown>
//             </Nav>

//             <Nav>
//               <Button variant="outline-light" as={Link} to="/profile">
//                 <FaUser style={{ marginRight: '5px' }} />
//                 Account
//               </Button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Routes>
//         <Route path="/" element={<BusSearch />} />
//         <Route path="/CustomerList" element={<CustomerList />} />
//         <Route path="/CustomerForm" element={<CustomerForm />} />
//         <Route path="/EditCustomer" element={<CustomerEdit />} />
//         <Route path="/DeleteCustomer" element={<CustomerDelete />} />
//         <Route path="/ProductList" element={<ProductList />} />
//         <Route path="/ProductForm" element={<ProductForm />} />
//         <Route path="/ProductDelete" element={<ProductDelete />} />
//         <Route path="/ProductEdit" element={<ProductEdit />} />
      
//         <Route path="/bus-details" element={<BusDetails />} />
//         <Route path="/billing" element={<Billing />} />
//         <Route path="/profile" element={<Profile />} />

//       </Routes>
//     </div>
//   );
// }

// export default Apps;

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';  // Import the profile icon from react-icons
import CustomerList from './Components/login/CustomerList';
import CustomerForm from './Components/login/CustomerForm';
import CustomerEdit from './Components/login/CustomerEdit';
import CustomerDelete from './Components/login/CustomerDelete';
import BusRead from './Components/login/Busread';
import ProductForm from './Components/login/BusCreate';
import ProductEdit from './Components/login/Update';
import ProductDelete from './Components/login/BusDelete';
import Info from './Components/Info';
import Payment from './Components/Payment';
import Bus from './Components/Bus';
import Profile from './Components/profile';
import CreateDriver from './Components/CreateDriver';


function Apps() {
  return (
    <div className="container-fluid p-0">
      <Navbar expand="lg" variant="dark" style={{ borderBottom: '1px solid #ccc', width: '100%', backgroundColor: ' #334d4d', position: 'fixed', zIndex: '100', top: '0' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">JourneyJet Bus Booking</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/billing">Invoice</Nav.Link>
              <Nav.Link as={Link} to="/driver">Driver</Nav.Link>

              <NavDropdown title="Bus" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/view-bus">View Bus</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/bus-form">Create a New Bus</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/edit-bus">Edit / Update a Bus</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/delete-bus">Delete a Bus</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Customers" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/CustomerList">View Customers</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/CustomerForm">Create a New Customer</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/EditCustomer">Edit / Update a Customer</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/DeleteCustomer">Delete a Customer</NavDropdown.Item>
              </NavDropdown>
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

      <div style={{ marginTop: '56px' }}>
        {/* This marginTop value should match the height of your Navbar */}
        <Routes>
          <Route path="/" element={<Bus/>} />
          <Route path="/CustomerList" element={<CustomerList />} />
          <Route path="/CustomerForm" element={<CustomerForm />} />
          <Route path="/EditCustomer" element={<CustomerEdit />} />
          <Route path="/DeleteCustomer" element={<CustomerDelete />} />
          <Route path="/view-bus" element={<BusRead />} />
          <Route path="/bus-form" element={<ProductForm />} />
          <Route path="/delete-bus" element={<ProductDelete />} />
          <Route path="/edit-bus" element={<ProductEdit />} />

          <Route path="/bus-details" element={<Info />} />
          <Route path="/billing" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/driver" element={<CreateDriver />} />
          <Route path="/profile" element={<Profile />} />
  
        </Routes>
      </div>
    </div>
  );
}

export default Apps;
