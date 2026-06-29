import { AppError } from '../utils/appError';
import { HTTP_STATUS, ENVIRONMENTS } from '../utils/constants';

const getEnvVariable = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new AppError(
            `CRITICAL CONFIGURATION ERROR: Environment variable '${key}' is missing!`,
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }

    return value;
};

export const config = Object.freeze({
    jwt: {
        secret: getEnvVariable('JWT_SECRET'),
        refreshSecret: getEnvVariable('JWT_REFRESH_SECRET'),
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
    server: {
        port: process.env.PORT || 5000,
        env: process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT,
    },
    redis: {
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        host: process.env.REDIS_HOST || '127.0.0.1',
    },
    mongodb: {
        port: parseInt(process.env.MONGODB_PORT || '27017', 10),
        uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/phone_comparor_v2'
    }
});