import { AppError } from "./appError";
import { HTTP_STATUS } from "./constants";
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from "../config/environment";

export const generateAuthTokens = (userId: string) => {
    const secret = (process.env.JWT_SECRET || 'fallback_secret_for_safety') as string;
    const refreshSecret = (process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret') as string;

    const accessTokenOptions: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any
    };
    const refreshTokenOptions: SignOptions = {
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any
    };
    const accessToken = jwt.sign(
        { id: userId },
        secret,
        accessTokenOptions
    );

    const refreshToken = jwt.sign(
        { id: userId },
        refreshSecret,
        refreshTokenOptions
    );

    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
    if (!token) {
        throw new AppError(
            'Token is Required',
            HTTP_STATUS.BAD_REQUEST
        );
    }

    return jwt.verify(token, config.jwt.secret);
};

export const verifyRefreshToken = (token: string) => {
    if (!token) {
        throw new AppError(
            'Token is Required',
            HTTP_STATUS.BAD_REQUEST
        );
    }

    return jwt.verify(token, config.jwt.refreshSecret);
};