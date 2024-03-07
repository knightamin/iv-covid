import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { examRoutes } from './modules/examination/examination.route';
import { authRoutes } from './modules/user/user.route';
import { authMiddleware } from './middlewares/auth.middleware';

export const app: Express = express();

/* ------------------------------- middlewares ------------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

app.use(helmet());

app.use(cookieParser());

/* -------------------------------------------------------------------------- */
/*                                 add routes                                 */
/* -------------------------------------------------------------------------- */

app.use('/api/v1', authRoutes);

/*for add authentication to all routes of examination add auth middleware to exam ruotes middleware directly */
app.use('/api/v1', authMiddleware, examRoutes);
