import { NextFunction, Request, Response } from "express";
import { expenseSchema } from "../Schema/expenseJoi";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const { error } = expenseSchema.validate(req.body);

  if (error) {
    return res.json(error.message);
  } else {
    next();
  }
};

export { validate };
