import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/update-password', authController.changePassword);

router.post('/google', authController.register);
router.post('/facebook', authController.register);
router.post('/apple', authController.register);

router.post('/logout', authController.register);

export default router