import { loginUser, updatePassword, registerUser } from '../services/authService';
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from '../utils/constants';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, accessToken, refreshToken } = await registerUser(req.body);

        res.status(HTTP_STATUS.CREATED).json({
            status: 'success',
            accessToken,
            refreshToken,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await loginUser(email, password);

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            accessToken,
            refreshToken,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { newPassword, oldPassword } = req.body;
        await updatePassword(req.user?.id as string, oldPassword, newPassword);

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            message: 'Password successfully updated'
        });
    } catch (error) {
        next(error);
    }
};