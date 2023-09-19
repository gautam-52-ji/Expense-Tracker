import express from "express";
import {
  addExpenseController,
  deleteExpenseController,
  getExpenseController,
  updateExpenseController,
} from "../controller/expenseServiceController";

const expenseRouter = express.Router();

expenseRouter.get("/", getExpenseController);
expenseRouter.post("/add", addExpenseController);
expenseRouter.put("/update/:id", updateExpenseController);
expenseRouter.delete("/delete/:id", deleteExpenseController);

export default expenseRouter;
