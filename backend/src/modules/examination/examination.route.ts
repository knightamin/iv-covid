import { Router } from 'express';
import {
    getAggregatedDataHandler,
    getFullListHandler,
    getListByLocaltionIdHandler,
} from './examination.controller';

export const examRoutes = Router();

/* ------------------------ get stat of locations id ------------------------ */
examRoutes.get('/examinations/stats', getAggregatedDataHandler);

/* --------------------- get list filter by locxationId --------------------- */
examRoutes.get('/examinations/:locationId', getListByLocaltionIdHandler);

/* -------------------------- get full list of data ------------------------- */
examRoutes.get('/examinations', getFullListHandler);
