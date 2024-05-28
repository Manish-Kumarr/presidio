const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose
  .connect(process.env.MONGO_CONN_URL)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((e) => {
    console.log('SOMETHING WRONG');
  });

module.exports = db;
