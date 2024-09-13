import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// Datos de ejemplo
const data = [
  { id: "1", medicion: 4000 },
  { id: "2", medicion: 3000 },
  { id: "3", medicion: 2000 },
  { id: "4", medicion: 2780 },
  { id: "5", medicion: 1890 },
  { id: "6", medicion: 2390 },
  { id: "7", medicion: 3490 },
];

const MyLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="medicion" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyLineChart;
