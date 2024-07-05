

// // const { DataTypes } = require('sequelize');
// // const { sequelize } = require('./dbConnectionsModel');

// // const Booking = sequelize.define('Booking', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true,
// //   },
  
// //   customer_name: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true, // Can be null
// //   },
// //   phone_number: {
// //     type: DataTypes.STRING(20),
// //     allowNull: true, // Can be null
// //   },
// //   email: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true, // Can be null
// //   },
// //   address: {
// //     type: DataTypes.TEXT,
// //     allowNull: true, // Can be null
// //   },
// //   bus_id: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true, // Can be null
// //   },
// //   selected_seats: {
// //     type: DataTypes.ARRAY(DataTypes.TEXT),
// //     allowNull: true, // Can be null
// //   },
// //   passenger_details: {
// //     type: DataTypes.ARRAY(DataTypes.JSONB),
// //     allowNull: true, // Can be null
// //   },
// //   discount_amount: {
// //     type: DataTypes.NUMERIC(10, 2),
// //     allowNull: true, // Can be null
// //   },
// //   gst: {
// //     type: DataTypes.NUMERIC(10, 2),
// //     allowNull: true, // Can be null
// //   },
// //   cart_total: {
// //     type: DataTypes.NUMERIC(10, 2),
// //     allowNull: true, // Can be null
// //   },
// //   route: {
// //     type: DataTypes.STRING,
// //     allowNull: true, // Can be null
// //   },
// //   bus_type: {
// //     type: DataTypes.STRING,
// //     allowNull: true, // Can be null
// //   },
// //   created_at: {
// //     type: DataTypes.DATE,
// //     defaultValue: DataTypes.NOW,
// //   },
// // }, {
// //   timestamps: false, // Disable Sequelize automatic timestamps
// // });

// // sequelize.sync()
// //   .then(() => console.log('Database synced'))
// //   .catch(err => console.error('Failed to sync database:', err));

// // module.exports = {Booking};


// // const { DataTypes } = require('sequelize');
// // const { sequelize } = require('./dbConnectionsModel');
// // const { Passenger } = require('./passenger');
// // const { Ticket } = require('./ticket');
// // const { BookingDetails } = require('./bookingDetails');

// // const Booking = sequelize.define('Booking', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true,
// //   },
// //   customerName: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   phoneNumber: {
// //     type: DataTypes.STRING(20),
// //     allowNull: true,
// //   },
// //   email: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   address: {
// //     type: DataTypes.TEXT,
// //     allowNull: true,
// //   },
// //   busId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true,
// //   },
// //   selectedSeats: {
// //     type: DataTypes.ARRAY(DataTypes.TEXT),
// //     allowNull: true,
// //   },
// //   createdAt: {
// //     type: DataTypes.DATE,
// //     defaultValue: DataTypes.NOW,
// //   },
// // });

// // Booking.hasMany(Passenger); // A booking has many passengers
// // Booking.hasMany(Ticket); // A booking has many tickets
// // Booking.hasOne(BookingDetails); // A booking has one set of booking details

// // sequelize.sync()
// //   .then(() => console.log('Database synced'))
// //   .catch(err => console.error('Failed to sync database:', err));

// // module.exports = {Booking};

// // const { DataTypes } = require('sequelize');
// // const { sequelize } = require('./dbConnectionsModel');
// // const { Passenger } = require('./passenger');
// // const { Ticket } = require('./ticket');
// // const { BookingDetails } = require('./bookingDetails');

// // const Booking = sequelize.define('Booking', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true,
// //   },
// //   customerName: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   phoneNumber: {
// //     type: DataTypes.STRING(20),
// //     allowNull: true,
// //   },
// //   email: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   address: {
// //     type: DataTypes.TEXT,
// //     allowNull: true,
// //   },
// //   busId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true,
// //   },
// //   selectedSeats: {
// //     type: DataTypes.ARRAY(DataTypes.TEXT),
// //     allowNull: true,
// //   },
// //   createdAt: {
// //     type: DataTypes.DATE,
// //     defaultValue: DataTypes.NOW,
// //   },
// // });

// // Booking.hasMany(Passenger); // A booking has many passengers
// // Booking.hasMany(Ticket); // A booking has many tickets
// // Booking.hasOne(BookingDetails); // A booking has one set of booking details

// // sequelize.sync()
// //   .then(() => console.log('Database synced'))
// //   .catch(err => console.error('Failed to sync database:', err));

// // module.exports = { Booking };


// // const { DataTypes } = require('sequelize');
// // const { sequelize } = require('./dbConnectionsModel');

// // const Booking = sequelize.define('Booking', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true,
// //   },
// //   customerName: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   phoneNumber: {
// //     type: DataTypes.STRING(20),
// //     allowNull: true,
// //   },
// //   email: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   address: {
// //     type: DataTypes.TEXT,
// //     allowNull: true,
// //   },
// //   busId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true,
// //   },
// //   selectedSeats: {
// //     type: DataTypes.ARRAY(DataTypes.TEXT),
// //     allowNull: true,
// //   },
// //   createdAt: {
// //     type: DataTypes.DATE,
// //     defaultValue: DataTypes.NOW,
// //   },
// // });

// // module.exports = { Booking };

// // const { DataTypes } = require('sequelize');
// // const { sequelize } = require('./dbConnectionsModel');

// // const Booking = sequelize.define('Booking', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true,
// //   },
// //   customerName: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   phoneNumber: {
// //     type: DataTypes.STRING(20),
// //     allowNull: true,
// //   },
// //   email: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   address: {
// //     type: DataTypes.TEXT,
// //     allowNull: true,
// //   },
// //   busId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true,
// //   },
// //   selectedSeats: {
// //     type: DataTypes.ARRAY(DataTypes.TEXT),
// //     allowNull: true,
// //   },
// //   createdAt: {
// //     type: DataTypes.DATE,
// //     defaultValue: DataTypes.NOW,
// //   },
// // });

// // module.exports = { Booking };
// // const { DataTypes } = require('sequelize');
// // const { sequelize } = require('./dbConnectionsModel');

// // const Booking = sequelize.define('Booking', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true,
// //   },
// //   customerName: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   phoneNumber: {
// //     type: DataTypes.STRING(20),
// //     allowNull: true,
// //   },
// //   email: {
// //     type: DataTypes.STRING(100),
// //     allowNull: true,
// //   },
// //   address: {
// //     type: DataTypes.TEXT,
// //     allowNull: true,
// //   },
// //   busId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true,
// //   },
// //   selectedSeats: {
// //     type: DataTypes.ARRAY(DataTypes.TEXT),
// //     allowNull: true,
// //   },
// //   createdAt: {
// //     type: DataTypes.DATE,
// //     defaultValue: DataTypes.NOW,
// //   },
// // });

// // module.exports = { Booking };

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Booking = sequelize.define('Booking', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   customerName: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   phoneNumber: {
//     type: DataTypes.STRING(20),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   busId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   selectedSeats: {
//     type: DataTypes.ARRAY(DataTypes.TEXT),
//     allowNull: true,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   tableName: 'Bookings' // Ensure table name matches the database
// });

// module.exports = { Booking };


// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Booking = sequelize.define('Booking', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   customerName: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   phoneNumber: {
//     type: DataTypes.STRING(20),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   busId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   selectedSeats: {
//     type: DataTypes.ARRAY(DataTypes.TEXT),
//     allowNull: true,
//   },
//   discountAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   GST: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   cartTotal: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   tableName: 'Bookings'
// });

// module.exports = { Booking };

// const { DataTypes, Model } = require('sequelize');
// const {sequelize} = require('./dbConnectionsModel');
// const {Passenger} = require('./passenger');

// class Booking extends Model {}

// Booking.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   customerName: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   phoneNumber: {
//     type: DataTypes.STRING(20),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   busId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   selectedSeats: {
//     type: DataTypes.ARRAY(DataTypes.TEXT),
//     allowNull: true,
//   },
//   discountAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   GST: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   cartTotal: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'Booking',
//   tableName: 'Bookings',
//   timestamps: true, // Enable Sequelize timestamps for createdAt and updatedAt
// });

// // Define relationships
// Booking.hasMany(Passenger, { foreignKey: 'bookingId', as: 'passengers' });

// module.exports = Booking;

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const Passenger = require('./passenger'); // Import Passenger model

// class Booking extends Model {}

// Booking.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   customerName: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   phoneNumber: {
//     type: DataTypes.STRING(20),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   busId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   selectedSeats: {
//     type: DataTypes.ARRAY(DataTypes.TEXT),
//     allowNull: true,
//   },
//   discountAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   GST: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   cartTotal: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'Booking',
//   tableName: 'Bookings',
//   timestamps: true, // Enable Sequelize timestamps for createdAt and updatedAt
// });

// // Define relationships
// Booking.hasMany(Passenger, { foreignKey: 'bookingId', as: 'passengers' });

// module.exports = {Booking};


// const { DataTypes } = require('sequelize');
// const {sequelize} = require('./dbConnectionsModel'); // Adjust the path as per your project structure

// const Booking = sequelize.define('Booking', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   customerName: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   phoneNumber: {
//     type: DataTypes.STRING(20),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   busId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   selectedSeats: {
//     type: DataTypes.ARRAY(DataTypes.TEXT),
//     allowNull: true,
//   },
//   discountAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   GST: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   cartTotal: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'Booking',
//   tableName: 'Bookings',
//   timestamps: true,
// });

// module.exports = {Booking};


const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel'); // Adjust the path as per your project structure

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  busId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  selectedSeats: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
  discountAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  GST: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  cartTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'Bookings',
  timestamps: true,
});

Booking.sync()
  .then(() => console.log('Driver table synced'))
  .catch(err => console.error('Failed to sync Driver table:', err));

module.exports = { Booking };
