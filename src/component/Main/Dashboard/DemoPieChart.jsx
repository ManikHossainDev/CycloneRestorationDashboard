import { Pie } from "@ant-design/plots";

const DemoPieChart = () => {
  const data = [
    { type: "Total Restoration Application", value: 75 },
    { type: "Total Sold", value: 35 },
  ];

  const config = {
    data,
    angleField: "value",
    colorField: "type",

    innerRadius: 0.6,
    radius: 1,
    autoFit: true,
    style: {
      backgroundColor: "#EEF9FE", 
    },
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        fontWeight: 600,
        fill: "#222", 
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.type,
        value: `${datum.value} (${((datum.value / 110) * 100).toFixed(1)}%)`,
      }),
    },
    legend: {
      position: "top",
      rowPadding: 5,
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "P&L\nTotal growth\n65%",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 14,
          fontWeight: 600,
          fill: "#48B1DB", 
        },
      },
    ],
    color: ["#48B1DB", "#FF7F50"], 
  };

  return (
    <div
      style={{
        backgroundColor: "#EEF9FE",
        padding: "0.5rem",
        borderRadius: "12px",
      }}
    >
      {/* Set the height here */}
      <Pie {...config} height={420} /> 
    </div>
  );
};

export default DemoPieChart;
