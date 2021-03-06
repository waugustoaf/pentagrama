import GetUserInfoController from '@modules/users/useCases/getUserInfo/GetUserInfoController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { officesRoutes } from './offices.routes';
import { peopleRoutes } from './people.routes';
import { professionTypesRoutes } from './professionTypes.routes';
import { usersRoutes } from './users.routes';

export const routes = Router();

routes.get('/me', ensureAuthenticated, GetUserInfoController.handle);
routes.use('/users', usersRoutes);
routes.use('/offices', officesRoutes);
routes.use('/profession-types', professionTypesRoutes);
routes.use('/people', peopleRoutes);
routes.use('/', authenticateRoutes);
