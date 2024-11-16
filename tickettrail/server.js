const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // For password hashing

const app = express();
const PORT = 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require("./myticket-7f435-firebase-adminsdk-ny5f3-18995f0fc3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myticket-7f435.firebaseio.com", // Replace with your Firebase URL
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Endpoint for User Registration
app.post("/api/register", async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body;

  // Validate Passwords Match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data to Firestore
    await admin.firestore().collection("users").add({
      fullName,
      email,
      password: hashedPassword, // Store the hashed password
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user: ", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// API Endpoint for User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user data from Firestore
    const userSnapshot = await admin.firestore()
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    const user = userSnapshot.docs[0].data();
    
    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    // Send user role as response
    return res.status(200).json({ 
      message: "Login successful", 
      role: user.role, 
      fullName: user.fullName 
    });
  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
