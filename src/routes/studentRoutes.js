import { Router } from 'express';
import studentController from '../controllers/StudentController';
import logged from '../middlewares/logged';

const router = new Router();

router.use(logged);

router.get('/', studentController.index);
router.get('/:id', studentController.show);
router.post('/', studentController.store);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

export default router;
