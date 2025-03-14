const env = require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async()=>{
   try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb');
    console.log('DB connected')
   } catch (error) {
    console.log(`errpr during connecting to DB ${error}`);
    process.exit(1);
   }
}


module.exports = connectDb;