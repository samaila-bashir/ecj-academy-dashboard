import React from "react";
import {
  ResponsiveContainer,
  PieChart as Chart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { chartColorPalette, currencyFormatter } from "../utils/helpers";

type PieChartData = {
  category: string;
  value: number;
};

const PieChart = ({ data, title }: { data: PieChartData[]; title: string }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={450}>
        <Chart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ value }) => {
              if (isNaN(value)) {
                console.warn("Received NaN for Pie chart value:", value);
                return "₦0";
              }
              return currencyFormatter(value);
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColorPalette[index % chartColorPalette.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => currencyFormatter(Number(value))} />{" "}
          <Legend />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
