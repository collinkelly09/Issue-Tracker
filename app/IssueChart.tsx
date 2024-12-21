"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface IssueStats {
  open: number;
  inProgress: number;
  closed: number;
}

interface IssueProps {
  stats: IssueStats;
}

const IssueChart = ({ stats }: IssueProps) => {
  const data = [
    { label: "Open", value: stats.open },
    { label: "In Progress", value: stats.inProgress },
    { label: "Closed", value: stats.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-11)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
