const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/user', require('./routes/user'));
app.use('/api/detections', require('./routes/detections'));
app.use('/api/redemptions', require('./routes/redemptions'));


// --- Start the Server ---
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
