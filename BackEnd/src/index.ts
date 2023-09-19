import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import expenseRouter from "./routes/expenseRouter";

config();

var app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ExpenseTracker");

app.use("/expense", expenseRouter);

app.listen(3000);
