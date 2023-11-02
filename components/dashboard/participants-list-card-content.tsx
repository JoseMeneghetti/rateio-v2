import { ImageIcon, UserCircle2Icon } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAppSelector } from "@/store/hook";
import {
  selectFindHowManyPayWithoutDiferences,
  selectListForResult,
} from "@/store/rateios/rateios.selectors";
import { Label } from "../ui/label";
import Image from "next/image";

interface ParticipantsListCardContentProps {
  name: string;
  value: number;
}
const ParticipantsListCardContent = ({
  name,
  value,
}: ParticipantsListCardContentProps) => {
  const expenses = useAppSelector(selectFindHowManyPayWithoutDiferences);
  const listForResult = useAppSelector(selectListForResult);

  const participantExp = () => {
    const result = expenses.reduce(
      (acc: { expense: string; value: number; icon: string }[], item) => {
        const findPerson = item.names.find((person) => person.name === name);

        if (findPerson) {
          return [
            ...acc,
            {
              expense: item.expense,
              icon: item.icon,
              value: findPerson?.value,
            },
          ];
        }
        return [...acc];
      },
      []
    );

    return result;
  };

  const totalExpenses = () => {
    return participantExp().reduce((acc: number, item) => {
      return acc + item.value;
    }, 0);
  };

  const totalExpend = () => {
    return listForResult.find((el) => el.participant === name)?.expenses ?? 0;
  };

  console.log(participantExp());

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex justify-between hover:bg-slate-50">
            <div className="flex gap-4 items-center ">
              <UserCircle2Icon width={50} height={50} />
              <CardTitle className="text-base font-base leading-none tracking-tight capitalize">
                {name}
              </CardTitle>
            </div>

            <CardDescription className="text-sm leading-none tracking-tight flex gap-1 items-center">
              <CardDescription className="text-black font-semibold">
                {value > 0 ? "+" : "-"}
              </CardDescription>
              U$
              <CardDescription className="text-black font-semibold">
                {value.toFixed(2)}
              </CardDescription>
            </CardDescription>
          </div>
        </TooltipTrigger>
        <TooltipContent className="min-w-[250px]">
          <div className="text-xs border-0">
            <Label className="text-sm capitalize">{name} Overview</Label>

            <div className="flex flex-col rounded-lg border p-4 gap-4">
              <Label className="text-sm">Expenses</Label>
              {participantExp().map((exp, index) => (
                <div
                  key={`${exp.expense}-${index}`}
                  className="flex flex-row justify-between items-center px-2"
                >
                  <div className="flex items-center justify-start gap-1">
                    {exp.icon ? (
                      <Image
                        src={`/icons/${exp.icon}.png`}
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

export default ParticipantsListCardContent;
