import React from "react";
import {
  ResponsiveContainer,
  ComposedChart as Chart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
  Line,
} from "recharts";
import { currencyFormatter } from "../utils/helpers";

type DataPoint = {
  name: string;
  total: number;
};

type ComposedChartProps = {
  data: DataPoint[];
  title: string;
};

const ComposedChart: React.FC<ComposedChartProps> = ({ data, title }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={450}>
        <Chart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis tickFormatter={currencyFormatter} />{" "}
          <Tooltip formatter={(value) => currencyFormatter(Number(value))} />{" "}
          <Legend />
          <Bar dataKey="total" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="total" stroke="#ff7300" />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComposedChart;
