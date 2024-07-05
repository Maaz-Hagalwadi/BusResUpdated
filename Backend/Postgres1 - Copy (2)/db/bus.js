


// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const { Register } = require('./registerModel');

// const Bus = sequelize.define('Bus', {
//   busId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   busName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   busNumber: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false
//   },
//   capacity: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   busType: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   numberOfSeats: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   contactNumber: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   from: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   to: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   busRoute: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false
//   },
//   busRouteTimes: {
//     type: DataTypes.ARRAY(DataTypes.DATE),
//     allowNull: false
//   },
//   busRouteFares: {
//     type: DataTypes.ARRAY(DataTypes.FLOAT),
//     allowNull: false
//   },
//   numOfSeats: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   runsOnDays: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false
//   },
//   departure: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   arrival: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   facilities: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: true
//   },
//   fare: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   reviews: {
//     type: DataTypes.JSONB, // Assuming reviews will be stored as JSONB
//     allowNull: true,
//     defaultValue: []
//   },
//   datesAvailable: {
//     type: DataTypes.ARRAY(DataTypes.STRING), // Changed to ARRAY of STRING to store dates only
//     allowNull: true,
//     defaultValue: []
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false
//   }
// }, {
//   timestamps: true // Enable Sequelize timestamps for createdAt and updatedAt
// });

// // Define relationships
// Bus.belongsTo(Register, { foreignKey: 'registerId', as: 'register' });

// module.exports = { Bus };


const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');
const { Register } = require('./registerModel');

const Bus = sequelize.define('Bus', {
  busId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  busNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  busType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fare: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: true // Enable Sequelize timestamps for createdAt and updatedAt
});

// Define relationships
Bus.belongsTo(Register, { foreignKey: 'registerId', as: 'register' });
Bus.sync()
  .then(() => console.log('seatselected table synced'))
  .catch(err => console.error('Failed to sync seatselected table:', err));


module.exports = { Bus };
