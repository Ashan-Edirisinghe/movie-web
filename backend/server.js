require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI ;

const rankRoutes = require('./routes/ranks');

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});


app.use(cors());
app.use(express.json());

app.use('/ranks', rankRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});