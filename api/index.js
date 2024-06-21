// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/signup');

const app = express();
const PORT = process.env.PORT || 8081;
// const MONGODB_URI = 'mongodb://localhost:27017/local';
// $con=mysqli(username)
// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// // Middleware
// app.use(bodyParser.json());

// // POST /employeesignup - Handle user signup
// app.post('/employeesignup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user with the same email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     // Create a new user instance
//     const newUser = new User({ email, password });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Signup Error:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// // POST /employeelogin - Handle user login
// app.post('/employeelogin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists with the provided email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the password matches
//     if (user.password !== password) {
//       return res.status(401).json({ error: 'Incorrect password' });
//     }

//     // Login successful
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
