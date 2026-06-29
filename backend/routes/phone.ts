import express from 'express';
import * as phoneController from '../controllers/phoneController';
import { restrictTo } from '../middlewares/authMiddleware';
import { ROLES } from '../utils/constants';

const router = express.Router();

router.get('/compare', phoneController.login);

router.get('/ai-analysis', restrictTo(ROLES.PREMIUM, ROLES.ADMIN), phoneController.register);

router.post('/add-phone', restrictTo(ROLES.ADMIN), phoneController.register);

router.delete('/:id', restrictTo(ROLES.ADMIN), phoneController.register);

export default router