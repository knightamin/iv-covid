import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { userSignin } from './user.schema';
import {
    checkUserHandler,
    signOutHandler,
    signinHandler,
} from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const authRoutes = Router();

/* ------------------------------ singin route ------------------------------ */
authRoutes.post(
    '/signin',
    validateRequest({
        body: userSignin,
    }),
    signinHandler
);

/* ------------------------------- check user ------------------------------- */
authRoutes.get('/check', authMiddleware, checkUserHandler);

/* ------------------------------ sign out route ----------------------------- */
authRoutes.get('/signout', authMiddleware, signOutHandler);
