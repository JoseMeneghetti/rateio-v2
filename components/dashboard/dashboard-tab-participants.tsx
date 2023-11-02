import React from "react";
import ExpensesSummaryRow from "./expenses-summary-row";
import { useAppSelector } from "@/store/hook";
import {
  selectFindHowManyPayWithoutDiferences,
  selectTotal,
} from "@/store/rateios/rateios.selectors";
import ParticipantsBarChart from "./participants-bar-chart";
import ParticipantsListCard from "./participants-list-card";

const DashboardTabParticipants = () => {
  const expenses = useAppSelector(selectFindHowManyPayWithoutDiferences);
  const total = useAppSelector(selectTotal);


  return (
    <div className="flex flex-col gap-y-4">
      <ExpensesSummaryRow
        expenses={expenses}
        numOfParticipants={2}
      />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <ParticipantsBarChart participants={total} />
        <ParticipantsListCard participants={total} />
      </div>
    </div>
  );
};

export default DashboardTabParticipants;
