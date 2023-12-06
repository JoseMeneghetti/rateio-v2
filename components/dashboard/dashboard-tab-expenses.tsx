import React from "react";
import ExpensesBarChart from "./expenses-bar-chart";
import ExpensesListCard from "./expenses-list-card";
import ExpensesSummaryRow from "./expenses-summary-row";

import {
  IListForResult,
  IParticipants,
  IwhoPaid,
} from "@/store/rateios/rateios.reducer";

interface DashboardTabExpenseProps {
  whoPaid: IwhoPaid[];
  listForResult: IListForResult[];
  participants: IParticipants[];
}
const DashboardTabExpense = ({
  whoPaid,
  listForResult,
  participants,
}: DashboardTabExpenseProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <ExpensesSummaryRow
        whoPaid={whoPaid}
        numOfParticipants={listForResult?.length}
      />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <ExpensesBarChart whoPaid={whoPaid} />
        <ExpensesListCard whoPaid={whoPaid} participants={participants} />
      </div>
    </div>
  );
};

export default DashboardTabExpense;
