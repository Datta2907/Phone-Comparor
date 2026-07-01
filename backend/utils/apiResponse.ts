import { Response } from 'express';
import { IApiResponse } from '../interfaces/common';

export class ApiResponse {
    public static send<T>(
        res: Response,
        statusCode: number,
        message: string,
        data: T = null as any
    ): void {
        const resultsCount = Array.isArray(data) ? data.length : undefined;

        const responsePayload: IApiResponse<T> = {
            status: 'success',
            statusCode,
            message,
            ...(resultsCount !== undefined && { results: resultsCount }),
            data
        };

        res.status(statusCode).json(responsePayload);
    }
}