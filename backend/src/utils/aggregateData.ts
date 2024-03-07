import { AggregateData } from '../types/AggregateData';
import { DbData } from '../types/dbData';

export const aggregateData = (db: DbData[], locationId: number) => {
    const result: AggregateData = {
        locationId,
        pending: db.filter(
            (itm) => itm.locationId === locationId && itm.result === 'pending'
        ).length,
        negative: db.filter(
            (itm) => itm.locationId === locationId && itm.result === 'negative'
        ).length,
        positive: db.filter(
            (itm) => itm.locationId === locationId && itm.result === 'positive'
        ).length,
    };

    return result;
};
