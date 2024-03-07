import { z } from 'zod';

export const userSignin = z.object({
    username: z.string(),
    password: z.string(),
});

export const jwtPayloadSchema = z.object({
    username: z.number(),
    role: z.string(),
});

export type SigninInput = z.infer<typeof userSignin>;
export type JwtData = z.infer<typeof jwtPayloadSchema>;
