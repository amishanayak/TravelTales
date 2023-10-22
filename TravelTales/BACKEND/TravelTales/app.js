const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const userRouter = require('./routing/user-routes');
const postRouter = require('./routing/post-routes');
const cors= require('cors');

const app= express();
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/posts",postRouter);


//connections
mongoose
.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.wg08hzl.mongodb.net/?retryWrites=true&w=majority`
)
.then(()=>
{app.listen(5000,()=>console.log("Connection Successful !! Listening to localhost Port 5000"));}
)
.catch((err)=> console.log(err));

