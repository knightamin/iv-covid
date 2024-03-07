import { AxiosError } from 'axios';
import { axiosFetch } from '../axios/axiosFetch';

export const authService = {
    signin: async (username: string, password: string) => {
        try {
            const { status, data } = await axiosFetch.post('/signin', {
                username,
                password,
            });

            if (status === 200) {
                const user = data.payload as UserResponse;
                localStorage.setItem('_user', JSON.stringify(user));
                return true;
            }
            return false;
        } catch (error) {
            const e = error as AxiosError;
            console.log('error', e.response);
            return false;
        }
    },
    checkUser: async () => {
        try {
            const { status } = await axiosFetch.get('/check');

            if (status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            const e = error as AxiosError;
            console.log('error', e.response);
            return false;
        }
    },
    signout: async () => {
        try {
            const { status } = await axiosFetch.get('/signout');

            if (status === 200) {
                return true;
            }
            return false;
        } catch (error) {
            const e = error as AxiosError;
            console.log('error', e.response);
            return false;
        }
    },
};
