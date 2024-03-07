import * as jwt from 'jsonwebtoken';
import { JwtData } from '../modules/user/user.schema';

/* -------------------------------------------------------------------------- */
/*                                  sign jwt                                  */
/* -------------------------------------------------------------------------- */
export const signJWT = (payload: object, expiresIn: string | number) => {
    return jwt.sign(payload, process.env.JWT_KEY as jwt.Secret, {
        expiresIn,
    });
};

/* -------------------------------------------------------------------------- */
/*                                 verify jwt                                 */
/* -------------------------------------------------------------------------- */
export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY as jwt.Secret
        ) as JwtData;
        return { payload: decoded, expired: false };
    } catch (error: any) {
        return { payload: null, expired: error.message };
    }
};
