import { Router } from 'express';
import { country as countryController } from '@controllers';

const route = Router();

route.get('/list', countryController.getCountries);

export default route;
