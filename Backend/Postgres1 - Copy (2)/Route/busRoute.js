


// // busRoutes.js
// const express = require('express');
// const router = express.Router(); // Change from express.bus() to express.Router()
// const {
//   createBus,
//   getAllBuses,
//   getBusById,
//   updateBusById,
//   deleteBusById,
// } = require('../controllers/busController');

// // Create a new bus record
// router.post('/', createBus);

// // Get all bus records
// router.get('/', getAllBuses);

// // Get a single bus record by ID
// router.get('/:id', getBusById);

// // Update a bus record by ID
// router.put('/:id', updateBusById);

// // Delete a bus record by ID
// router.delete('/:id', deleteBusById);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const {
//   createBus,
//   getAllBuses,
//   getBusById,
//   updateBusById,
//   deleteBusById,
//   addReview,
//   getReview,
// } = require('../controllers/busController');

// // Create a new bus record
// router.post('/', createBus);

// // Get all bus records
// router.get('/', getAllBuses);

// // Get a single bus record by ID
// router.get('/:id', getBusById);

// // Update a bus record by ID
// router.put('/:id', updateBusById);

// // Delete a bus record by ID
// router.delete('/:id', deleteBusById);

// // Add review to a bus
// router.post('/:busId/reviews', addReview);

// // Get reviews of a bus
// router.get('/:busId/reviews', getReview);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const {
//   createBus,
//   getAllBuses,
//   getBusById,
//   updateBusById,
//   deleteBusById,
//   addReview,
//   getReview,
// } = require('../controllers/busController'); // Adjust path as needed

// // Create a new bus record
// router.post('/', createBus);

// // Get all bus records
// router.get('/', getAllBuses);

// // Get a single bus record by ID
// router.get('/:id', getBusById);

// // Update a bus record by ID
// router.put('/:id', updateBusById);

// // Delete a bus record by ID
// router.delete('/:id', deleteBusById);

// // Add review to a bus
// router.post('/:busId/reviews', addReview);

// // Get reviews of a bus
// router.get('/:busId/reviews', getReview);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const {
//   createBus,
//   getAllBuses,
//   getAvailableBuses,
//   getBusById,
//   updateBusById,
//   deleteBusById
// } = require('../controllers/busController');
// const {
//   addReview,
//   getReview
// } = require('../controllers/reviewController');

// // Create a new bus record
// router.post('/', createBus);

// // Get all bus records
// router.get('/', getAllBuses);


// // Get all available bus records
// router.get('/', getAvailableBuses);

// // Get a single bus record by ID
// router.get('/:id', getBusById);

// // Update a bus record by ID
// router.put('/:id', updateBusById);

// // Delete a bus record by ID
// router.delete('/:id', deleteBusById);

// // Add a review to a bus record
// router.post('/:busId/reviews', addReview);

// // Get reviews of a bus record
// router.get('/:busId/reviews', getReview);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  createBus,
  getAllBuses,
  getBusById,
  updateBusById,
  deleteBusById
} = require('../controllers/busController');

// Create a new bus record
router.post('/', createBus);

// Get all bus records
router.get('/', getAllBuses);

// Get a single bus record by ID
router.get('/:id', getBusById);

// Update a bus record by ID
router.put('/:id', updateBusById);

// Delete a bus record by ID
router.delete('/:id', deleteBusById);

module.exports = router;
