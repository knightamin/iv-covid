import axios from 'axios';
import { api } from './api';

export const axiosFetch = axios.create({
    baseURL: `${api.url}`,
    withCredentials: true,
});
