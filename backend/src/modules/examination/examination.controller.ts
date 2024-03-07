import { Request, Response } from 'express';
import {
    sendErrorResponse,
    sendSuccessResponse,
} from '../../utils/sendResponse';

import db from '../../db/db.json';
import { aggregateData } from '../../utils/aggregateData';
import { AggregateData } from '../../types/AggregateData';
import { DbData } from '../../types/dbData';

/* -------------------------- get full list of data ------------------------- */
export const getFullListHandler = async (req: Request, res: Response) => {
    try {
        const { limit, page } = req.query;
        let result = [];

        /* -------------------------- check for pagination -------------------------- */
        if (limit && page) {
            const _page = Number(page);
            const _limit = Number(limit);
            result = await db.slice((_page - 1) * _limit, _page * _limit);
        } else {
            result = db;
        }

        return sendSuccessResponse(res, 200, { result, total: db.length });
    } catch (error: Error | any) {
        return sendErrorResponse(res, 400, 'Error on get list', error);
    }
};

/* ------------------------- get list by locationIId ------------------------ */
export const getListByLocaltionIdHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const { locationId } = req.params;
        const { limit, page } = req.query;
        let result = [];

        /* ------------------- check for pagination for data fetch ------------------ */
        if (limit && page) {
            const _page = Number(page);
            const _limit = Number(limit);
            result = await db
                .filter((itm) => itm.locationId === Number(locationId))
                .slice((_page - 1) * _limit, _page * _limit);
        } else {
            result = await db.filter(
                (itm) => itm.locationId === Number(locationId)
            );
        }

        /* ------------------------ get total records of data ----------------------- */
        const total = db.filter(
            (itm) => itm.locationId === Number(locationId)
        ).length;

        return sendSuccessResponse(res, 200, {
            result,
            total,
        });
    } catch (error: Error | any) {
        return sendErrorResponse(res, 400, 'Error on get list', error);
    }
};

/* ------------- data aggregated by ofpositive/pending/negative ------------- */
export const getAggregatedDataHandler = async (req: Request, res: Response) => {
    try {
        const { fromDate, toDate } = req.query;

        let data: DbData[] = [];

        // check that fromDate and toDate query string is passed from frontendor not
        if (fromDate) {
            if (toDate) {
                /* --------------------------- if have date range --------------------------- */

                data = db.filter(
                    (itm) =>
                        itm.date.split('T')[0] >= fromDate &&
                        itm.date.split('T')[0] <= toDate
                );
            } else {
                /* ----------------------- if we have just first date ----------------------- */
                data = db.filter((itm) => itm.date.split('T')[0] >= fromDate);
            }
        } else {
            /* ---------------------- if we have no filter for date --------------------- */
            data = db;
        }
        console.log('data', data.length);
        /* ------------------------ get list of location Ids ------------------------ */
        const locationIds = [...new Set(data.map((itm) => itm.locationId))];

        let result: AggregateData[] = [];

        /* ------------ for each location ids calculate the aggregateData ----------- */
        for (let index = 0; index < locationIds.length; index++) {
            const element = locationIds[index];
            const stat = aggregateData(data, element);
            result = [...result, stat];
        }

        return sendSuccessResponse(res, 200, result);
    } catch (error: Error | any) {
        return sendErrorResponse(res, 400, 'Error on get list', error);
    }
};
