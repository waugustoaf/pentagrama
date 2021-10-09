import CreateOfficeController from '@modules/offices/useCases/createOffice/CreateOfficeController';
import DeleteOfficeController from '@modules/offices/useCases/deleteOffice/DeleteOfficeController';
import ListOfficeController from '@modules/offices/useCases/listOffices/ListOfficeController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const officesRoutes = Router();

officesRoutes.get('/', ListOfficeController.handle);
officesRoutes.post(
  '/',
  ensureAuthenticated,
  CreateOfficeController.validation(),
  CreateOfficeController.handle,
);
officesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  DeleteOfficeController.handle,
);
