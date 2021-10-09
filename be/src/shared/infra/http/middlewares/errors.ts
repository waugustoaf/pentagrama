import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';

export const errors = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'Error', message: err.message });
  } else {
    return response.status(500).json({
      status: 'Error',
      message: `INTERNAL SERVER ERROR (${err.message})`,
    });
  }
};
