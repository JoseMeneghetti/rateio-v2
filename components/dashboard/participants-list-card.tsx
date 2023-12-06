import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { INames } from "@/store/rateios/rateios.reducer";
import ParticipantsListCardContent from "./participants-list-card-content";

interface ParticipantsListCardProps {
  participants: INames[];
  whoPaid: any;
  listForResult: any;
}
const ParticipantsListCard = ({
  participants,
  listForResult,
  whoPaid,
}: ParticipantsListCardProps) => {
  return (
    <Card className="text-card-foreground shadow">
      <CardHeader>
        <CardTitle className="text-base font-semibold leading-none tracking-tight">
          Participants Overview
        </CardTitle>
        <CardDescription className="text-sm leading-none tracking-tight">
          find how much the participants own
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {participants.map((particpant) => (
          <ParticipantsListCardContent
            listForResult={listForResult}
            whoPaid={whoPaid}
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
