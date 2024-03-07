import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse } from '../utils/sendResponse';
import { verifyJWT } from '../utils/jwt';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.cookies?.accessToken;
    if (accessToken) {
        const { payload, expired } = verifyJWT(accessToken);

        if (expired) {
            return sendErrorResponse(res, 401, 'invalid token');
        }
        next();
    } else {
        return sendErrorResponse(res, 403, 'not authenticated');
    }
};
