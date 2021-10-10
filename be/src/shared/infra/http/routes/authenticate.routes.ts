import AuthenticateUserController from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import GetSessionInfoController from '@modules/users/useCases/getSessionInfo/GetSessionInfoController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const authenticateRoutes = Router();

authenticateRoutes.post(
  '/sessions',
  AuthenticateUserController.validation(),
  AuthenticateUserController.handle,
);

authenticateRoutes.get(
  '/sessions/info',
  ensureAuthenticated,
  GetSessionInfoController.handle,
);
