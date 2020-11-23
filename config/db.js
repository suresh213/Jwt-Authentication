const config = require('config');
const mongoose = require('mongoose');
const dataBase = config.get('MongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dataBase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
