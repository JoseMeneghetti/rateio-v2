"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import ExpensesListCardContent from "./expenses-list-card-content";
import { IFindHowManyPayWithoutDiferences } from "@/store/rateios/rateios.reducer";

interface ExpensesListCardProps {
  expenses: IFindHowManyPayWithoutDiferences[];
}
const ExpensesListCard = ({ expenses }: ExpensesListCardProps) => {
  return (
    <Card className="text-card-foreground shadow">
      <CardHeader>
        <CardTitle className="text-base font-semibold leading-none tracking-tight">
          Expenses Overview
        </CardTitle>
        <CardDescription className="text-sm leading-none tracking-tight">
          find how much the people expend.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense) => (
          <ExpensesListCardContent
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
