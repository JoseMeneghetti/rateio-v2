import { ImageIcon, UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { CardDescription, CardTitle } from "../ui/card";

import { Label } from "../ui/label";

import { IParticipants, IwhoPaid } from "@/store/rateios/rateios.reducer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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
  const findExpense = whoPaid.find(
    (el) => el.expense === expense && el.value === value
  );

  const [isOpen, setIsOpen] = useState(false);

  const expensePairs = participants
    .map((participant) => {
      const expenseItem = participant.expenses.filter(
        (item) => item.expense_name === expense
      );
      const findExpItem = expenseItem.find((el) => el.expense_value === value);

      if (findExpItem) {
        return { name: participant.name, value: findExpItem.expense_value };
      }
      return null; // Retornar null para participantes sem a despesa especificada
    })
    .filter((item) => item)[0];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="flex justify-between hover:bg-slate-50"
        >
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
      </PopoverTrigger>

      <PopoverContent className="min-w-[250px]">
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
      </PopoverContent>
    </Popover>
  );
};

export default ExpensesListCardContent;
