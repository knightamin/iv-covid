type ExaminationResponse = {
    date: string;
    id: number;
    locationId: number;
    result: 'pending' | 'negative' | 'positive';
};
