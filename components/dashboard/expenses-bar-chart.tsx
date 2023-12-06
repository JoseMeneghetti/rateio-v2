import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IwhoPaid } from "@/store/rateios/rateios.reducer";

interface ExpensesBarChartProps {
  whoPaid: IwhoPaid[];
}

const ExpensesBarChart = ({ whoPaid }: ExpensesBarChartProps) => {
  return (
    <Card className="text-card-foreground shadow">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-semibold leading-none tracking-tight">
          Overview Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72 max-h-[300px] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={whoPaid}>
            <XAxis
              dataKey="expense"
              stroke="transparent"
              tick={{ fill: "#6b6b6b" }}
              className="capitalize text-xs"
            />
            <YAxis
              stroke="transparent"
              tick={{ fill: "#6b6b6b" }}
              className="text-xs"
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#ADFA1B"
              maxBarSize={41}
              //   activeBar={<Rectangle stroke="transparent" fill="transparent" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensesBarChart;
