const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const connectDb = require('./config/connectDB');
const userRouter = require('./router/userRouter');

console.log('hei')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
// app.use(express.static(__dirname,'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true,
  cookie: {
    secure:false,
    httpOnly:true,
    maxAge:72*60*60*1000 // 72 hourse
  }
}))
app.set('views', [
    path.join(__dirname, 'views/user'),
    path.join(__dirname, 'views/admin')
  ]);
  


  app.use('/',userRouter);

connectDb()
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on  http://localhost:${PORT}`)
})

module.exports = app;

