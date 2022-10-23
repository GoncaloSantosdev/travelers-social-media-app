import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import morgan from "morgan";
// Routes
import userRouter from './routes/user.js';
import tourRouter from './routes/tour.js';

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRouter);
app.use('/tour', tourRouter);

const MONGODB_URL = 'mongodb+srv://goncalosantos:Benfica190482@cluster0.m5dotvo.mongodb.net/?retryWrites=true&w=majority';
const port = 4000;

app.route('/', (req, res) => {
    res.send();
});

mongoose.connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));