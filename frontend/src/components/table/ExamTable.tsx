import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    list: ExaminationResponse[] | undefined;
    page: number;
    limit: number;
    totalRecords: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
};

function ExamTable({
    handleNextPage,
    handlePreviousPage,
    limit,
    list,
    page,
    totalRecords,
}: Props) {
    return (
        <div className=" table-container">
            <table className="table is-hoverable is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>LocationId</th>
                        <th>Date</th>
                        <th>Id</th>
                        <th>result</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((rec) => (
                        <tr key={rec.id}>
                            <td>
                                <Link
                                    to={`/locations/${rec.locationId}?page=1&limit=10`}
                                >
                                    {rec.locationId}
                                </Link>
                            </td>
                            <td>{rec.date.split('T')[0]}</td>
                            <td>{rec.id}</td>
                            <td
                                className={`${
                                    rec.result === 'negative'
                                        ? 'has-background-success'
                                        : rec.result === 'pending'
                                        ? 'has-background-warning'
                                        : 'has-background-danger'
                                }`}
                            >
                                {rec.result}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="is-flex is-align-items-center is-justify-content-center ">
                <button
                    className="button is-outlined mx-2"
                    disabled={page === 1 ? true : false}
                    onClick={handlePreviousPage}
                >
                    Previous
                </button>
                <button
                    className="button is-outlined mx-2"
                    disabled={page * limit >= totalRecords ? true : false}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ExamTable;
