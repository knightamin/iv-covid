import { z } from 'zod';

const aggregateSchema = z.object({
    locatinId: z.number(),
    pending: z.number(),
    negative: z.number(),
    positive: z.number(),
});
