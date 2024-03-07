import { AxiosError } from 'axios';
import { errorToast } from '../../utils/toast';
import { axiosFetch } from '../axios/axiosFetch';

export const examService = {
    getListOfExamination: async (page: number, limit: number) => {
        try {
            const { status, data } = await axiosFetch.get(
                `/examinations?page=${page}&limit=${limit}`
            );

            if (status === 200) {
                return {
                    total: data.payload.total,
                    exams: data.payload.result as ExaminationResponse[],
                };
            }
        } catch (error) {
            const e = error as AxiosError;
            console.log('error', e.response);
            errorToast('Error in fetching data');
        }
    },
    getListByLocationId: async (
        locationId: number,
        page: number,
        limit: number
    ) => {
        try {
            const { status, data } = await axiosFetch.get(
                `/examinations/${locationId}?page=${page}&limit=${limit}`
            );

            if (status === 200) {
                return {
                    total: data.payload.total,
                    exams: data.payload.result as ExaminationResponse[],
                };
            }
        } catch (error) {
            const e = error as AxiosError;
            console.log('error', e.response);
            errorToast('Error in fetching data');
        }
    },
    getAggregateData: async (fromDate?: string, toDate?: string) => {
        try {
            let url = '/examinations/stats';
            if (fromDate) {
                url += `?fromDate=${fromDate}`;

                if (toDate) {
                    url += `&toDate=${toDate}`;
                }
            }

            const { status, data } = await axiosFetch.get(url);

            if (status === 200) {
                return data.payload as AggregateData[];
            }
        } catch (error) {
            const e = error as AxiosError;
            console.log('error', e.response);
            errorToast('Error in fetching data');
        }
    },
};
