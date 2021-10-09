import CreateUserController from '@modules/users/useCases/createUser/CreateUserController';
import ListUsersController from '@modules/users/useCases/listUsers/ListUsersController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router();

usersRoutes.get('/', ensureAuthenticated, ListUsersController.handle);
usersRoutes.post(
  '/',
  ensureAuthenticated,
  CreateUserController.validation(),
  CreateUserController.handle,
);
