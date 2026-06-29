import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { IErrorResponse } from '../interfaces/common';
import { ENVIRONMENTS, HTTP_STATUS } from '../utils/constants';

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response<IErrorResponse>,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const status = err.status || 'error';
    const message = err.message || 'Internal Server Error';

    const response: IErrorResponse = {
        status,
        statusCode,
        message,
        ...(err.data && { data: err.data })
    };

    if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
        response.stack = err.stack;
        res.status(statusCode).json(response);
    } else {
        if (err.isOperational) {
            res.status(statusCode).json(response);
        } else {
            console.error('ERROR:', err);

            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: 'Something went very wrong on our end!'
            });
        }
    }
};