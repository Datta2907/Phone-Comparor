import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from '../utils/constants';
import { createPhone, updatePhone, deletePhone } from '../services/phoneService';
import { ApiResponse } from "../utils/apiResponse";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await createPhone(req.user?.id as string, req.body);
        ApiResponse.send(
            res,
            HTTP_STATUS.OK,
            'Phone created successfully.',
            data
        );

    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await updatePhone(req.params.id as string, req.body);

        ApiResponse.send(
            res,
            HTTP_STATUS.OK,
            'Phone updated successfully.',
            data
        );
    } catch (error) {
        next(error);
    }
};

export const deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deletePhone(req.user?.id as string, req.params.id as string);

        ApiResponse.send(
            res,
            HTTP_STATUS.OK,
            'Phone deleted successfully.',
            null
        );
    } catch (error) {
        next(error);
    }
};