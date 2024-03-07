import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
type Props = {
    data: AggregateData[] | undefined;
};

export default function AggregateChart({ data }: Props) {
    return (
        <>
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <BarChart
                width={700}
                height={500}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="locationId" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pending" stackId="a" fill="#ecc042" />
                <Bar dataKey="positive" stackId="a" fill="#f50e00" />
                <Bar dataKey="negative" stackId="a" fill="#00d1b2" />
            </BarChart>
            {/* </ResponsiveContainer> */}
        </>
    );
}
