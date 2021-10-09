import AuthenticateUserController from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import { Router } from 'express';

export const authenticateRoutes = Router();

authenticateRoutes.post('/sessions', AuthenticateUserController.handle);
