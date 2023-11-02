import React from "react";
import ExpensesBarChart from "./expenses-bar-chart";
import ExpensesListCard from "./expenses-list-card";
import ExpensesSummaryRow from "./expenses-summary-row";
import { useAppSelector } from "@/store/hook";
import {
  selectFindHowManyPayWithoutDiferences,
  selectListForResult,
} from "@/store/rateios/rateios.selectors";

const DashboardTabExpense = () => {
  const expenses = useAppSelector(selectFindHowManyPayWithoutDiferences);
  const listForResult = useAppSelector(selectListForResult);

  return (
    <div className="flex flex-col gap-y-4">
      <ExpensesSummaryRow
        expenses={expenses}
        numOfParticipants={listForResult.length}
      />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <ExpensesBarChart expenses={expenses} />
        <ExpensesListCard expenses={expenses} />
      </div>
    </div>
  );
};

export default DashboardTabExpense;
