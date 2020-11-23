const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
app.use(cors());
app.use(express.json({ extended: false }));

// Connecting with database
connectDB();

app.get('/', (req, res) => {
  res.send('Server');
});

// routes
app.use('/api/login', require('./routes/api/login'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/profile', require('./routes/api/profile'));

// Setting Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
