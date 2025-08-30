import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetRatioQuery } from "../../../redux/features/Status/Status";

const PureComponentChart = () => {
  // State for selected year
  const [year, setYear] = useState(new Date().getFullYear());

  // Fetch data using the selected year
  const { data, isLoading, isError } = useGetRatioQuery(year);

  const chartData = data?.data?.attributes || [];

  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };

  if (isLoading) return <div>Loading chart...</div>;
  if (isError) return <div>Error loading chart.</div>;

  return (
    <div style={{ position: "relative", width: "100%", height: 400 }}>
      {/* Year selector button/dropdown */}
      <div style={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
        <select className="p-2 shadow rounded-md" value={year} onChange={handleYearChange}>
          {Array.from({ length: 5 }).map((_, idx) => {
            const y = new Date().getFullYear() - idx;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#72C2E3" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#EEF9FE" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) =>
              typeof value === "number" ? `$${(value / 1000).toFixed(1)}k` : value
            }
          />
          <Tooltip
            formatter={(value) => {
              const numericValue = typeof value === "number" ? value : 0;
              return `$${(numericValue / 1000).toFixed(2)}k`;
            }}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="totalEarnings"
            stroke="#8884d8"
            fill="url(#gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PureComponentChart;
