import { Router } from 'express';
import countryRoute from './country';

const appRoute = Router();

appRoute.use('/countries', countryRoute);

export default appRoute;
