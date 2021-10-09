import CreateProfessionTypeController from '@modules/professionTypes/useCases/createProfessionType/CreateProfessionTypeController';
import ListProfessionTypesController from '@modules/professionTypes/useCases/listProfessionTypes/ListProfessionTypesController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const professionTypesRoutes = Router();

professionTypesRoutes.get('/', ListProfessionTypesController.handle);
professionTypesRoutes.post(
  '/',
  ensureAuthenticated,
  CreateProfessionTypeController.validation(),
  CreateProfessionTypeController.handle,
);
