import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
};
