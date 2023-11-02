import { ImageIcon } from "lucide-react";
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
import { useAppSelector } from "@/store/hook";
import { selectFindHowManyPayWithoutDiferences } from "@/store/rateios/rateios.selectors";

interface ExpensesListCardContentProps {
  icon: string;
  expense: string;
  value: number;
}
const ExpensesListCardContent = ({
  expense,
  icon,
  value,
}: ExpensesListCardContentProps) => {
  const expenses = useAppSelector(selectFindHowManyPayWithoutDiferences);

  const findExpense = expenses.find((el) => el.expense === expense)

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
              <Label className="text-sm">Expenses</Label>
              {findExpense?.names.map((participant, index) => (
                <div
                  key={`${participant.name}-${index}`}
                  className="flex flex-row justify-between items-center px-2"
                >
                  <div className="flex items-center justify-start gap-1">
                    {icon ? (
                      <Image
                        src={`/icons/${icon}.png`}
                        width={25}
                        height={25}
                        alt={"icon"}
                      />
                    ) : (
                      <ImageIcon width={25} height={25} />
                    )}
                    <p className="capitalize">{exp.expense}</p>
                  </div>
                  <p>U$ {exp.value}</p>
                </div>
              ))}
              <div className="text-sm flex justify-between">
                <Label>Sum of shares</Label>
                <Label>U$ {totalExpenses()}</Label>
              </div>
              <div className="text-sm flex justify-between">
                <Label>Total expend</Label>
                <Label>U$ {totalExpend()}</Label>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExpensesListCardContent;
