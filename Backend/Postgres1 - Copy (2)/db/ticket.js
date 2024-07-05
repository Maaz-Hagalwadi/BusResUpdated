// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const {Booking} = require('./bookingModel');

// const Ticket = sequelize.define('Ticket', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   seatNumber: {
//     type: DataTypes.STRING(10),
//     allowNull: false,
//   },
//   fare: {
//     type: DataTypes.NUMERIC(10, 2),
//     allowNull: false,
//   },
// });

// Ticket.belongsTo(Booking); // A ticket belongs to a booking

// module.exports = {Ticket};

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const { Booking } = require('./bookingModel'); // Ensure correct import

// const Ticket = sequelize.define('Ticket', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   seatNumber: {
//     type: DataTypes.STRING(10),
//     allowNull: false,
//   },
//   fare: {
//     type: DataTypes.NUMERIC(10, 2),
//     allowNull: false,
//   },
// });

// Ticket.belongsTo(Booking); // A ticket belongs to a booking

// module.exports = { Ticket };

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Ticket = sequelize.define('Ticket', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   seatNumber: {
//     type: DataTypes.STRING(10),
//     allowNull: false,
//   },
//   fare: {
//     type: DataTypes.NUMERIC(10, 2),
//     allowNull: false,
//   },
// });

// module.exports = { Ticket };

const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  seatNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  fare: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
});

module.exports = { Ticket };
