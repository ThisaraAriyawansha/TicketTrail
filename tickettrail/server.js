const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const session = require('express-session');
const router = express.Router();
const nodemailer = require("nodemailer");


const serviceAccount = require("./myticket-7f435-firebase-adminsdk-ny5f3-18995f0fc3.json");








// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

