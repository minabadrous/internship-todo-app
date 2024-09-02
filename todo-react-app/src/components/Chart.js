import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

function Chart({ pieChartData }) {
  const COLORS = ["#0088FE", "#00C49F"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={pieChartData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        innerRadius={50}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
}

export default Chart;
