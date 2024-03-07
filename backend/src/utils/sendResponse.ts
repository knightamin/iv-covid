import { Response } from 'express';

export const sendErrorResponse = (
    res: Response,
    code: number,
    errorMesssage: string,
    e: Error | null = null
) => {
    return res.status(code).json({
        status: 'error',
        message: errorMesssage,
        e: e?.toString(),
    });
};

export const sendSuccessResponse = (
    res: Response,
    code: number,
    data: object[] | object | string | number | null,
    message: string = 'success'
) => {
    return res.status(code).json({
        status: 'success',
        payload: data,
        message,
    });
};
