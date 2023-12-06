import React from "react";
import SummaryCard from "./summary-card";
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from "lucide-react";

import { IListForResult, INames } from "@/store/rateios/rateios.reducer";

interface ExpensesSummaryRowProps {
  list: IListForResult[];
  total: INames[];
}

const ExpensesSummaryRow = ({ list, total }: ExpensesSummaryRowProps) => {
  const spender = () => {
    if (list?.length > 0) {
      const sumResult = list.reduce((acc: IListForResult, item) => {
        if (item.expenses <= acc.expenses) {
          return acc;
        }
        return item;
      });
      return sumResult;
    }
  };

  const cheaper = () => {
    if (list?.length > 0) {
      const sumResult = list.reduce((acc: IListForResult, item) => {
        if (item.expenses > acc.expenses) {
          return acc;
        }
        return item;
      });
      return sumResult;
    }
  };

  const moreRentability = () => {
    if (total?.length > 0) {
      const sumResult = total?.reduce((acc: INames, item) => {
        if (item.value <= acc.value) {
          return acc;
        }
        return item;
      });
      return sumResult;
    }
  };

  const lessRentability = () => {
    if (total?.length > 0) {
      const sumResult = total?.reduce((acc: INames, item) => {
        if (item.value > acc.value) {
          return acc;
        }
        return item;
      });
      return sumResult;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-4 sm:overflow-x-auto">
      <SummaryCard
        title="Who expend more"
        description={`${spender()?.participant} expend more`}
        icon={<ArrowUpNarrowWideIcon />}
        value={`U$ ${(spender()?.expenses ?? 0).toFixed(2)}`}
      />
      <SummaryCard
        title="Who expend less"
        description={`${cheaper()?.participant} expend less`}
        icon={<ArrowDownNarrowWideIcon />}
        value={`U$ ${(cheaper()?.expenses ?? 0).toFixed(2)}`}
      />
      <SummaryCard
        title="Who receives more"
        description={`${moreRentability()?.name} receives more`}
        icon={<ArrowUpNarrowWideIcon />}
        value={`U$ ${(moreRentability()?.value ?? 0).toFixed(2)}`}
      />
      <SummaryCard
        title="Who pays more"
        description={`${lessRentability()?.name} need to pay more`}
        icon={<ArrowDownNarrowWideIcon />}
        value={`U$ ${(lessRentability()?.value ?? 0).toFixed(2)}`}
      />
    </div>
  );
};

export default ExpensesSummaryRow;
