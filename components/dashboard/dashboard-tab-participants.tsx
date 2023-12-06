import React from "react";

import ParticipantsBarChart from "./participants-bar-chart";
import ParticipantsListCard from "./participants-list-card";
import ParticipantsSummaryRow from "./participants-summary-row";
import {
  IListForResult,
  INames,
  IwhoPaid,
} from "@/store/rateios/rateios.reducer";

interface DashboardTabParticipantsProps {
  listForResult: IListForResult[];
  total: INames[];
  whoPaid: IwhoPaid[];
}

const DashboardTabParticipants = ({
  listForResult,
  total,
  whoPaid,
}: DashboardTabParticipantsProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <ParticipantsSummaryRow list={listForResult} total={total} />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <ParticipantsBarChart participants={total} />
        <ParticipantsListCard
          participants={total}
          listForResult={listForResult}
          whoPaid={whoPaid}
        />
      </div>
    </div>
  );
};

export default DashboardTabParticipants;
