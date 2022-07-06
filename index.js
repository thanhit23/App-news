import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongooses from 'mongoose';
import bodyParser from 'body-parser';
// import mongodb from 'mongodb'

import authRoute from './routes/authen.js';
import userRoute from './routes/user.js';
import postsRoute from './routes/post.js';
import commentRoute from './routes/comment.js';
import middlewaresAuthor from './middlewares/auth.js';

dotenv.config();

const app = express();
// const MongoClient = mongooses.MongoClient
// import MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:8000';

// MongoClient.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }, (err, client) => {
//     if (err) {
//       return console.log(err);
//     }

//     const db = client.db('comment');

//     console.log(`MongoDB Connected: ${url}`);
//   });


mongooses.connect(url, () => {
  console.log('Mongo runing...');
  console.log(`http://localhost:${process.env.PORT}`);
})

var db = mongooses.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/v1/auth', authRoute);
app.use('/v1/user', middlewaresAuthor.verifyToken, userRoute);
app.use('/v1/post', middlewaresAuthor.verifyToken, postsRoute);
app.use('/v1/comment', middlewaresAuthor.verifyToken, commentRoute);

app.listen(process.env.PORT || 8800, () => {
  console.log('Server running');
})
