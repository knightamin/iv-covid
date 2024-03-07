import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useEffect, useState } from 'react';
import { examService } from '../services/examination/exam.service';
import ExamTable from '../components/table/ExamTable';

function Home() {
    const [params, setParams] = useSearchParams();
    const location = useLocation();
    const { locationId } = useParams();
    const [list, setList] = useState<ExaminationResponse[]>();
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const page = Number(params.get('page'));
    const limit = Number(params.get('limit'));

    /* ----------------------- fetch data for examinations ---------------------- */
    const fetchData = async () => {
        const data = await examService.getListOfExamination(page, limit);

        if (data) {
            setList(data.exams);
            setTotalRecords(data.total);
        }
    };

    /* ----------- fetch data for examination with specific locationId ---------- */
    const fetchDataByLocationId = async () => {
        if (locationId) {
            const data = await examService.getListByLocationId(
                Number(locationId),
                page,
                limit
            );
            if (data) {
                setList(data.exams);
                setTotalRecords(data.total);
            }
        }
    };
    useEffect(() => {
        if (params.get('page') === null) {
            const param = new URLSearchParams({
                page: '1',
                limit: '10',
            });

            setParams(param);
        }

        if (location.pathname.includes('locations')) {
            fetchDataByLocationId();
        } else {
            fetchData();
        }
    }, [params, location]);

    /* --------------------------- go to previous page -------------------------- */

    const handlePreviousPage = () => {
        const param = new URLSearchParams({
            page: String(page - 1),
            limit: '10',
        });

        setParams(param);
    };

    /* ---------------------------- go to next pagfe ---------------------------- */

    const handleNextPage = () => {
        const param = new URLSearchParams({
            page: String(page + 1),
            limit: '10',
        });

        setParams(param);
    };

    return (
        <MainLayout>
            <div className="box">
                <ExamTable
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                    limit={limit}
                    list={list}
                    page={page}
                    totalRecords={totalRecords}
                />
            </div>
        </MainLayout>
    );
}

export default Home;
