import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const expenseModel = mongoose.model("expense", expenseSchema);

export { expenseModel };
