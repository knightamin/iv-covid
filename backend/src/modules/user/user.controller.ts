import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';

import {
    sendErrorResponse,
    sendSuccessResponse,
} from '../../utils/sendResponse';
import { SigninInput } from './user.schema';
import auth from '../../db/auth.json';
import { signJWT } from '../../utils/jwt';

/* ------------------------------- user signin ------------------------------ */
export const signinHandler = async (req: Request, res: Response) => {
    try {
        const body: SigninInput = req.body;

        // console.log('hash', bcrypt.hashSync(body.password, 12));

        const user = auth.find((itm) => itm.username === body.username);
        if (user) {
            const passCheck = await bcrypt.compare(
                body.password,
                user.password
            );

            if (passCheck) {
                const accessToken = signJWT(
                    {
                        username: user.username,
                        role: user.role,
                    },
                    '1h'
                );

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    maxAge: 120 * 60 * 1000,
                });
                return sendSuccessResponse(res, 200, {
                    username: user.username,
                    name: user.name,
                });
            } else {
                return sendErrorResponse(
                    res,
                    401,
                    'invalid username or password'
                );
            }
        } else {
            return sendErrorResponse(res, 401, 'invalid username or password');
        }
    } catch (error: Error | any) {
        return sendErrorResponse(res, 400, 'Error in signin', error);
    }
};

/* ------------------------- check user is loged in ------------------------- */
export const checkUserHandler = async (req: Request, res: Response) => {
    return res.sendStatus(200);
};

/* ------------------------------ user sign out ----------------------------- */
export const signOutHandler = async (req: Request, res: Response) => {
    try {
        return res
            .cookie('accessToken', '', { maxAge: 0 })
            .json({ message: 'signed out' });
    } catch (error: Error | any) {
        return sendErrorResponse(res, 400, 'Error in signin', error);
    }
};
