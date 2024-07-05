
// module.exports = loginRoute;

// const express = require('express');
// const {  Login } = require('../db/loginModel');
// const {  Register } = require('../db/registerModel'); // Adjust the path if necessary
// const { v4: uuidv4 } = require('uuid');
// const bcrypt = require('bcrypt');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     const checkUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['userName', 'password', 'email', 'status']
//     });

//     if (checkUser) {
//       if (checkUser.status !== 'active') {
//         res.status(403).send('Account not yet activated. Please verify your OTP.');
//         return;
//       }

//       bcrypt.compare(data.password, checkUser.password, async (err, result) => {
//         if (!result) {
//           res.status(401).send("Invalid Data");
//         } else {
//           const newUser = await Login.create({
//             ...data,
//             loginId: uuidv4(),
//           });

//           if (newUser) {
//             res.send("User logged in successfully");
//           }
//         }
//       });
//     } else {
//       res.status(403).send('Not yet registered');
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(401).send("Error while user login");
//   }
// });

// module.exports = loginRoute;

// // const express = require('express');
// // const { Register, Login } = require('../db/dbConection');
// // const { v4: uuidv4 } = require('uuid');
// // const bcrypt = require('bcrypt');

// // const loginRoute = express.Router();

// // loginRoute.get("/", (req, res) => {
// //   res.send("login page");
// // });

// // loginRoute.post("/", async (req, res) => {
// //   const data = req.body;
// //   try {
// //     const checkUser = await Register.findOne({
// //       where: { email: data.email },
// //       attributes: ['userName', 'password', 'email', 'status']
// //     });

// //     if (checkUser) {
// //       if (checkUser.status !== 'active') {
// //         res.status(403).send('Account not yet activated. Please verify your OTP.');
// //         return;
// //       }

// //       bcrypt.compare(data.password, checkUser.password, async (err, result) => {
// //         if (!result) {
// //           res.status(401).send("Invalid Data");
// //         } else {
// //           const newUser = await Login.create({
// //             ...data,
// //             loginId: uuidv4(),
// //           });

// //           if (newUser) {
// //             res.send("User logged in successfully");
// //           }
// //         }
// //       });
// //     } else {
// //       res.status(403).send('Not yet registered');
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(401).send("Error while user login");
// //   }
// // });

// // module.exports = loginRoute;

// loginRoute.js

// const express = require('express');
// const { Login } = require('../db/loginModel');
// const { Register } = require('../db/registerModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     // Find the user in the Register model
//     const checkUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role']
//     });

//     if (!checkUser) {
//       return res.status(403).send('User not found'); // User not registered
//     }

//     // Check if account is active
//     if (checkUser.status !== 'active') {
//       return res.status(403).send('Account not yet activated. Please verify your OTP.');
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(data.password, checkUser.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Invalid password'); // Incorrect password
//     }

//     // Generate JWT token with userId and role in payload
//     const tokenPayload = {
//       userId: checkUser.registerId,
//       role: checkUser.role,
//     };

//     const token = jwt.sign(tokenPayload, 'your_jwt_secret_key', { expiresIn: '1h' });

//     // Create a login record
//     const loginAttempt = await Login.create({
//       email: data.email,
//       password: data.password, // Store plain password for logging purpose, in real-world should store securely
//       loginId: uuidv4(),
//     });

//     if (loginAttempt) {
//       // Return JWT token
//       res.json({ token });
//     } else {
//       res.status(500).send('Failed to log login attempt');
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user login");
//   }
// });

// module.exports = loginRoute;


// loginRoute.js

// const express = require('express');
// const { Login } = require('../db/loginModel');
// const { Register } = require('../db/registerModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     // Find the user in the Register model
//     const checkUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role']
//     });

//     if (!checkUser) {
//       return res.status(403).send('User not found'); // User not registered
//     }

//     // Check if account is active
//     if (checkUser.status !== 'active') {
//       return res.status(403).send('Account not yet activated. Please verify your OTP.');
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(data.password, checkUser.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Invalid password'); // Incorrect password
//     }

//     // Generate JWT token with userId and role in payload
//     const tokenPayload = {
//       userId: checkUser.registerId,
//       role: checkUser.role,
//     };

//     const token = jwt.sign(tokenPayload, 'your_jwt_secret_key', { expiresIn: '1h' });

//     // Return JWT token in the response
//     res.json({ token });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user login");
//   }
// });

// module.exports = loginRoute;

// const express = require('express');
// const { Login } = require('../db/loginModel');
// const { Register } = require('../db/registerModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     // Find the user in the Register model
//     const checkUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role']
//     });

//     if (!checkUser) {
//       return res.status(403).send('User not found'); // User not registered
//     }

//     // Check if account is active
//     if (checkUser.status !== 'active') {
//       return res.status(403).send('Account not yet activated. Please verify your OTP.');
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(data.password, checkUser.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Invalid password'); // Incorrect password
//     }

//     // Generate JWT token with userId and role in payload
//     const tokenPayload = {
//       userId: checkUser.registerId,
//       role: checkUser.role,
//     };

//     const token = jwt.sign(tokenPayload, 'your_jwt_secret_key', { expiresIn: '1h' });

//     // Return JWT token in the response
//     res.json({ token });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user login");
//   }
// });

// module.exports = loginRoute;

//WORKING
// const express = require('express');
// const { Login } = require('../db/loginModel');
// const { Register } = require('../db/registerModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const { authenticateToken } = require('./authMiddleware'); // Import the middleware

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// // Example of a protected route that requires authentication
// loginRoute.get("/profile", authenticateToken, async (req, res) => {
//   try {
//     // Fetch user details using userId from token payload
//     const user = await Register.findByPk(req.user.userId, {
//       attributes: ['userName', 'email', 'phoneNumber', 'role']
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user); // Send user details including role
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error retrieving user profile");
//   }
// });

// loginRoute.post("/", async (req, res) => {
//   const data = req.body;
//   try {
//     // Find the user in the Register model
//     const checkUser = await Register.findOne({
//       where: { email: data.email },
//       attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role']
//     });

//     if (!checkUser) {
//       return res.status(403).send('User not found'); // User not registered
//     }

//     // Check if account is active
//     if (checkUser.status !== 'active') {
//       return res.status(403).send('Account not yet activated. Please verify your OTP.');
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(data.password, checkUser.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Invalid password'); // Incorrect password
//     }

//     // Generate JWT token with userId and role in payload
//     const tokenPayload = {
//       userId: checkUser.registerId,
//       role: checkUser.role,
//     };

//     const token = jwt.sign(tokenPayload, 'your_jwt_secret_key', { expiresIn: '1h' });

//     // Return JWT token in the response
//     res.json({ token });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user login");
//   }
// });

// module.exports = loginRoute;

// const express = require('express');
// const { Login } = require('../db/loginModel'); // Adjust this import based on your actual models
// const { Register } = require('../db/registerModel'); // Adjust this import based on your actual models
// const bcrypt = require('bcrypt');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find the user in the Register model
//     const checkUser = await Register.findOne({
//       where: { email },
//       attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role']
//     });

//     if (!checkUser) {
//       return res.status(403).send('User not found'); // User not registered
//     }

//     // Check if account is active
//     if (checkUser.status !== 'active') {
//       return res.status(403).send('Account not yet activated. Please verify your OTP.');
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(password, checkUser.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Invalid password'); // Incorrect password
//     }

//     // Return user details including role
//     res.json({
//       userName: checkUser.userName,
//       email: checkUser.email,
//       role: checkUser.role // Return the user's role
//       phoneNumber:checkUser.phoneNumber
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user login");
//   }
// });

// module.exports = loginRoute;

// const express = require('express');
// const { Login } = require('../db/loginModel'); // Adjust this import based on your actual models
// const { Register } = require('../db/registerModel'); // Adjust this import based on your actual models
// const bcrypt = require('bcrypt');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find the user in the Register model
//     const checkUser = await Register.findOne({
//       where: { email },
//       attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role']
//     });

//     if (!checkUser) {
//       return res.status(403).send('User not found'); // User not registered
//     }

//     // Check if account is active
//     if (checkUser.status !== 'active') {
//       return res.status(403).send('Account not yet activated. Please verify your OTP.');
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(password, checkUser.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Invalid password'); // Incorrect password
//     }

//     // Return user details including role
//     res.json({
//       userName: checkUser.userName,
//       email: checkUser.email,
//       role: checkUser.role // Return the user's role
     
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user login");
//   }
// });

// module.exports = loginRoute;
// const express = require('express');
// const { Login } = require('../db/loginModel'); // Adjust this import based on your actual models
// const { Register } = require('../db/registerModel'); // Adjust this import based on your actual models
// const bcrypt = require('bcrypt');

// const loginRoute = express.Router();

// loginRoute.get("/", (req, res) => {
//   res.send("login page");
// });

// loginRoute.post("/", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find the user in the Register model
//     const checkUser = await Register.findOne({
//       where: { email },
//       attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role','phoneNumber','age','gender',]
//     });

//     if (!checkUser) {
//       return res.status(403).send('User not found'); // User not registered
//     }

//     // Check if account is active
//     if (checkUser.status !== 'active') {
//       return res.status(403).send('Account not yet activated. Please verify your OTP.');
//     }

//     // Compare passwords
//     const passwordMatch = await bcrypt.compare(password, checkUser.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Invalid password'); // Incorrect password
//     }

//     // Return user details including role
//     res.json({
//       userName: checkUser.userName,
//       email: checkUser.email,
//       role: checkUser.role ,
//       phoneNumber:checkUser.phoneNumber,
//       age:checkUser.age,
//       gender:checkUser.gender

     
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error while user login");
//   }
// });

// module.exports = loginRoute;

const express = require('express');
const { Login } = require('../db/loginModel'); // Adjust this import based on your actual models
const { Register } = require('../db/registerModel'); // Adjust this import based on your actual models
const bcrypt = require('bcrypt');

const loginRoute = express.Router();

loginRoute.get("/", (req, res) => {
  res.send("login page");
});

loginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the Register model
    const checkUser = await Register.findOne({
      where: { email },
      attributes: ['registerId', 'userName', 'password', 'email', 'status', 'role','phoneNumber','age','gender']
    });

    if (!checkUser) {
      // Log the login attempt
      await Login.create({
        email,
        password,
      });
      return res.status(403).send('User not found'); // User not registered
    }

    // Check if account is active
    if (checkUser.status !== 'active') {
      // Log the login attempt
      await Login.create({
        email,
        password,
      });
      return res.status(403).send('Account not yet activated. Please verify your OTP.');
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, checkUser.password);

    if (!passwordMatch) {
      // Log the login attempt
      await Login.create({
        email,
        password,
      });
      return res.status(401).send('Invalid password'); // Incorrect password
    }

    // Log the successful login attempt
    await Login.create({
      email,
      password,
    });

    // Return user details including role
    res.json({
      userName: checkUser.userName,
      email: checkUser.email,
      role: checkUser.role,
      phoneNumber: checkUser.phoneNumber,
      age: checkUser.age,
      gender: checkUser.gender
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error while user login");
  }
});

module.exports = loginRoute;
