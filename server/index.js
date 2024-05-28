const express = require('express');
const app = express();
const cp = require('cookie-parser');
require('./db');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());

app.use(cp());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Backend Server!');
});

app.use('/user', require('./routes/user.routes'));
app.use('/property', require('./routes/property.routes'));

app.listen(5000, () => {
  console.log('RUNNING AT 5000');
});
