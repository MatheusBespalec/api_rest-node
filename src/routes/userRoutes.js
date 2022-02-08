import { Router } from 'express';
import userController from '../controllers/UserController';
import logged from '../middlewares/logged';

const router = new Router();

router.get('/', userController.index);
router.get('/:id', logged, userController.show);
router.post('/', userController.store);
router.put('/', logged, userController.update);
router.delete('/', logged, userController.delete);

export default router;
