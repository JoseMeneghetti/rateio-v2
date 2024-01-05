import { ImageIcon, UserCircle2Icon } from "lucide-react";
import React, { useState } from "react";
import { CardDescription, CardTitle } from "../ui/card";

import { Label } from "../ui/label";
import Image from "next/image";
import { IListForResult, IwhoPaid } from "@/store/rateios/rateios.reducer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ParticipantsListCardContentProps {
  name: string;
  value: number;
  whoPaid: IwhoPaid[];
  listForResult: IListForResult[];
}
const ParticipantsListCardContent = ({
  name,
  value,
  listForResult,
  whoPaid,
}: ParticipantsListCardContentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const participantExp = () => {
    const result = whoPaid.reduce(
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

  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="flex justify-between hover:bg-slate-50"
        >
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
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[250px]">
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
                <p>U$ {exp.value?.toFixed(2)}</p>
              </div>
            ))}
            <div className="text-sm flex justify-between">
              <Label>Total cost</Label>
              <Label>U$ {totalExpenses()?.toFixed(2)}</Label>
            </div>
            <div className="text-sm flex justify-between">
              <Label>Total expend</Label>
              <Label>U$ {totalExpend()?.toFixed(2)}</Label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ParticipantsListCardContent;
