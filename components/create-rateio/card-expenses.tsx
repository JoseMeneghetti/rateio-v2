import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { EditIcon, ImageIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { IExpenses } from "@/store/rateios/rateios.reducer";
import { useAppDispatch } from "@/store/hook";
import {
  setModalEditOpen,
  setModalDeleteOpen,
} from "@/store/modal/modal.actions";

interface CardExpensesProps {
  expense: IExpenses;
  name: string;
}

const CardExpenses = ({ expense, name }: CardExpensesProps) => {
  const dispatch = useAppDispatch();
  return (
    <Card
      key={expense.expense_name}
      className="flex gap-2 items-center py-2 px-4 justify-between"
    >
      {expense.icon ? (
        <Image
          src={`/icons/${expense.icon}.png`}
          width={50}
          height={50}
          alt={"icon"}
        />
      ) : (
        <ImageIcon width={50} height={50} />
      )}
      <CardContent className="px-4 py-1 flex flex-col gap-4 flex-grow">
        <div className="flex justify-start items-center gap-2">
          <CardTitle className="text-md">Expense: </CardTitle>
          <CardDescription className="capitalize">
            {expense.expense_name.length > 0 ? expense.expense_name : "-"}
          </CardDescription>
        </div>
        <div className="flex justify-start items-center gap-2 ">
          <CardTitle className="text-md">Value: </CardTitle>
          <CardDescription> US$ {expense.expense_value}</CardDescription>
        </div>
      </CardContent>
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              setModalEditOpen({
                name,
                expense,
              })
            );
          }}
        >
          <EditIcon width={15} height={15} />
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              setModalDeleteOpen({
                name,
                expense,
              })
            );
          }}
        >
          <TrashIcon width={15} height={15} />
        </Button>
      </div>
    </Card>
  );
};

export default CardExpenses;
