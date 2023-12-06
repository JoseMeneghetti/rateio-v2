import { ImageIcon, UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CardDescription, CardTitle } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Label } from "../ui/label";

import { IParticipants, IwhoPaid } from "@/store/rateios/rateios.reducer";

interface ExpensesListCardContentProps {
  icon: string;
  expense: string;
  value: number;
  whoPaid: IwhoPaid[];
  participants: IParticipants[];
}
const ExpensesListCardContent = ({
  expense,
  icon,
  value,
  participants,
  whoPaid,
}: ExpensesListCardContentProps) => {
  const findExpense = whoPaid.find((el) => el.expense === expense);

  const expensePairs = participants
    .map((participant) => {
      const expenseItem = participant.expenses.find(
        (item) => item.expense_name === expense
      );
      if (expenseItem) {
        return { name: participant.name, value: expenseItem.expense_value };
      }
      return null; // Retornar null para participantes sem a despesa especificada
    })
    .filter((item) => item)[0];

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex justify-between hover:bg-slate-50">
            <div className="flex gap-4 items-center">
              {icon ? (
                <Image
                  src={`/icons/${icon}.png`}
                  width={50}
                  height={50}
                  alt={"icon"}
                />
              ) : (
                <ImageIcon width={50} height={50} />
              )}
              <CardTitle className="text-base font-base leading-none tracking-tight capitalize">
                {expense}
              </CardTitle>
            </div>
            <CardDescription className="text-sm leading-none tracking-tight flex gap-1 items-center">
              + U$
              <CardDescription className="text-black font-semibold">
                {value.toFixed(2)}
              </CardDescription>
            </CardDescription>
          </div>
        </TooltipTrigger>

        <TooltipContent className="min-w-[250px]">
          <div className="text-xs border-0">
            <Label className="text-sm capitalize">{expense} Overview</Label>

            <div className="flex flex-col rounded-lg border p-4 gap-4">
              <Label className="text-sm">Share</Label>
              {findExpense?.names.map((participant, index) => {
                return (
                  <div
                    key={`${participant.name}-${index}`}
                    className="flex flex-row justify-between items-center px-2"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <UserCircle2Icon width={25} height={25} />
                      <p className="capitalize">{participant.name}</p>
                    </div>
                    <p>U$ {participant.value?.toFixed(2)}</p>
                  </div>
                );
              })}
              <Label>Who paid</Label>
              <div className="text-sm flex justify-between px-2">
                <Label className="capitalize">{expensePairs?.name}</Label>
                <Label>U$ {expensePairs?.value?.toFixed(2)}</Label>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExpensesListCardContent;
