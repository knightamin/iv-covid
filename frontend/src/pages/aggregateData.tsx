import MainLayout from '../layouts/MainLayout';
import { useEffect, useState } from 'react';
import { examService } from '../services/examination/exam.service';
import { errorToast } from '../utils/toast';
import AggregateChart from '../components/aggregateData/Chart';
import { ResponsiveContainer } from 'recharts';
import AggTable from '../components/aggregateData/AggTable';

type DateFilter = {
    from: string;
    to: string;
};

function AggregateData() {
    const [date, setDate] = useState<DateFilter>({
        from: '',
        to: '',
    });
    const [list, setList] = useState<AggregateData[]>();

    /* --------------------- get aggregate data from server --------------------- */
    const fetchData = async () => {
        let data;

        if (date.from === '') {
            data = await examService.getAggregateData();
        } else {
            if (date.to === '') {
                data = await examService.getAggregateData(date.from);
            } else {
                if (date.from < date.to) {
                    data = await examService.getAggregateData(
                        date.from,
                        date.to
                    );
                } else {
                    errorToast('first Date is Bigger than Second date');
                }
            }
        }

        if (data) {
            setList(data);
        }
    };

    /* ----------------------------- use effect part ---------------------------- */
    useEffect(() => {
        fetchData();
    }, []);

    /* ---------------- show the data by filtering by date range ---------------- */

    const handleFilterData = () => {
        fetchData();
    };

    /* ------------------------ set first date for filter ----------------------- */
    const handleChangeFromDate = (e: { target: { value: string } }) => {
        setDate({ ...date, from: e.target.value });
    };

    /* ---------------- filter second date rnage for filter data ---------------- */
    const handleChangeToDate = (e: { target: { value: string } }) => {
        setDate({ ...date, to: e.target.value });
    };

    return (
        <MainLayout>
            <div className="box">
                <p className="mb-3 has-text-grey">
                    ** you can filter the aggregate data by date
                </p>
                <div className="is-flex is-align-items-center">
                    <span className="mr-2">Filter Date</span>
                    <input
                        type="date"
                        className="input"
                        style={{ width: 175 }}
                        value={date.from}
                        onChange={handleChangeFromDate}
                    />
                    <span>~</span>

                    <input
                        type="date"
                        className="input"
                        style={{ width: 175 }}
                        value={date.to}
                        onChange={handleChangeToDate}
                    />
                    <button
                        className="button is-primary ml-2"
                        onClick={handleFilterData}
                    >
                        Filter
                    </button>
                </div>
                <div className="columns is-desktop">
                    <div className="column ">
                        <>
                            <ResponsiveContainer width="100%" height="100%">
                                <AggregateChart data={list} />
                            </ResponsiveContainer>
                        </>
                    </div>
                    <div className="column ">
                        <AggTable data={list} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default AggregateData;
