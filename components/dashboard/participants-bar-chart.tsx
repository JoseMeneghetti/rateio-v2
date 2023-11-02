import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { INames } from "@/store/rateios/rateios.reducer";

interface ParticipantsBarChartProps {
  participants: INames[];
}

const ParticipantsBarChart = ({ participants }: ParticipantsBarChartProps) => {
  return (
    <Card className="text-card-foreground shadow">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-semibold leading-none tracking-tight">
          Overview Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72 max-h-[300px] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={participants}>
            <XAxis
              dataKey="name"
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
            <ReferenceLine y={0} stroke="#6b6b6b" />
            <Bar dataKey="value" fill="#81ff47" maxBarSize={41} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ParticipantsBarChart;
