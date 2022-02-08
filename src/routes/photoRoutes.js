import { Router } from 'express';
import logged from '../middlewares/logged';

import PhotoController from '../controllers/PhotoController';

const router = new Router();

router.post('/', logged, PhotoController.store);

export default router;
