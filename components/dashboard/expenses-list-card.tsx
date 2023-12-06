import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import ExpensesListCardContent from "./expenses-list-card-content";
import { IParticipants, IwhoPaid } from "@/store/rateios/rateios.reducer";

interface ExpensesListCardProps {
  whoPaid: IwhoPaid[];
  participants: IParticipants[];
}
const ExpensesListCard = ({ whoPaid, participants }: ExpensesListCardProps) => {
  return (
    <Card className="text-card-foreground shadow">
      <CardHeader>
        <CardTitle className="text-base font-semibold leading-none tracking-tight">
          Expenses Overview
        </CardTitle>
        <CardDescription className="text-sm leading-none tracking-tight">
          find how much the people expend
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {whoPaid?.map((expense) => (
          <ExpensesListCardContent
            participants={participants}
            whoPaid={whoPaid}
            key={expense.expense}
            expense={expense.expense}
            icon={expense.icon}
            value={expense.value}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ExpensesListCard;
