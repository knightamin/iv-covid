import React from 'react';

type Props = {
    data: AggregateData[] | undefined;
};

function AggTable({ data }: Props) {
    return (
        <div
            className=" table-container"
            style={{ height: 500, overflowY: 'scroll' }}
        >
            <table className="table is-hoverable is-bordered is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th className="has-background-grey">locationId</th>
                        <th className="has-background-warning">pending</th>
                        <th className="has-background-primary">negative</th>
                        <th className="has-background-danger">positive</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((rec) => (
                        <tr key={rec.locationId}>
                            <td>{rec.locationId}</td>
                            <td>{rec.pending}</td>
                            <td>{rec.negative}</td>
                            <td>{rec.positive}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AggTable;
