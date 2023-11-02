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
import {
  IFindHowManyPayWithoutDiferences,
  INames,
} from "@/store/rateios/rateios.reducer";
import ParticipantsListCardContent from "./participants-list-card-content";

interface ParticipantsListCardProps {
  participants: INames[];
}
const ParticipantsListCard = ({ participants }: ParticipantsListCardProps) => {
  return (
    <Card className="text-card-foreground shadow">
      <CardHeader>
        <CardTitle className="text-base font-semibold leading-none tracking-tight">
          participants Overview
        </CardTitle>
        <CardDescription className="text-sm leading-none tracking-tight">
          find how much the participants own.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {participants.map((particpant) => (
          <ParticipantsListCardContent
            key={particpant.name}
            name={particpant.name}
            value={particpant.value}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ParticipantsListCard;
