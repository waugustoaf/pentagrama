import CreatePersonController from '@modules/people/useCases/createPerson/CreatePersonController';
import ListPeopleController from '@modules/people/useCases/listPerson/ListPeopleController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const peopleRoutes = Router();

peopleRoutes.get('/', ensureAuthenticated, ListPeopleController.handle);
peopleRoutes.post(
  '/',
  ensureAuthenticated,
  CreatePersonController.validate(),
  CreatePersonController.handle,
);
