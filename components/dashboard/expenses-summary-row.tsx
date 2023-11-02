import React from "react";
import SummaryCard from "./summary-card";
import {
  ArrowUpNarrowWideIcon,
  DollarSignIcon,
  PizzaIcon,
  Users2Icon,
} from "lucide-react";

import { IFindHowManyPayWithoutDiferences } from "@/store/rateios/rateios.reducer";

interface ExpensesSummaryRowProps {
  expenses: IFindHowManyPayWithoutDiferences[];
  numOfParticipants: number;
}

const ExpensesSummaryRow = ({
  expenses,
  numOfParticipants,
}: ExpensesSummaryRowProps) => {

  const sumOfAllExpenses = () => {
    if (expenses.length > 0) {
      const sumResult = expenses.reduce(
        (acc: number, item) => acc + item.value,
        0
      );
      return sumResult;
    }
  };

  const getMaxValue = () => {
    if (expenses.length > 0) {
      const maxValue = expenses.reduce((acc: number, item) => {
        if (item.value >= acc) {
          return item.value;
        } else return acc;
      }, 0);
      return maxValue;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-4 sm:overflow-x-auto">
      <SummaryCard
        title="Total Expenses"
        description="sum of all expenses."
        icon={<DollarSignIcon />}
        value={`U$ ${(sumOfAllExpenses() ?? 0).toFixed(2)}`}
      />
      <SummaryCard
        title="Most expensive"
        description="high value on the chart."
        icon={<ArrowUpNarrowWideIcon />}
        value={`U$ ${(getMaxValue() ?? 0).toFixed(2)}`}
      />
      <SummaryCard
        title="Participants"
        description="number of participants."
        icon={<Users2Icon />}
        value={`${numOfParticipants ?? 0}`}
      />
      <SummaryCard
        title="Expenses"
        description="number of expenses."
        icon={<PizzaIcon />}
        value={`${expenses.length ?? 0}`}
      />
    </div>
  );
};

export default ExpensesSummaryRow;
