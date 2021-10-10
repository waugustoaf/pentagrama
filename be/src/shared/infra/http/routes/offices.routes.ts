import CreateOfficeController from '@modules/offices/useCases/createOffice/CreateOfficeController';
import DeleteOfficeController from '@modules/offices/useCases/deleteOffice/DeleteOfficeController';
import ListOfficeCostPerMonthController from '@modules/offices/useCases/listOfficeCostPerMonth/ListOfficeCostPerMonthController';
import ListOfficeController from '@modules/offices/useCases/listOffices/ListOfficeController';
import RegisterCostsController from '@modules/offices/useCases/registerCosts/RegisterCostsController';
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
officesRoutes.post(
  '/register-month-costs',
  ensureAuthenticated,
  RegisterCostsController.validate(),
  RegisterCostsController.handle,
);
officesRoutes.get(
  '/list-month-costs',
  ensureAuthenticated,
  ListOfficeCostPerMonthController.handle,
);
