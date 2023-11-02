import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface SummaryCard {
  title: string;
  value: string;
  description: string;
  icon: JSX.Element;
}

const SummaryCard = ({ title, value, description, icon }: SummaryCard) => {
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow pb-4">
      <CardHeader className="p-6 flex flex-col space-y-0 pb-2">
        <CardTitle className="text-base flex justify-between pb-4">
          {title}
          {icon}
        </CardTitle>
        <CardTitle className="">{value}</CardTitle>
        <CardDescription className="mt-0">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SummaryCard;
