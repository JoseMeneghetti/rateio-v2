import { AlertCircleIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IParticipants } from "@/store/rateios/rateios.reducer";
import CardExpenses from "./card-expenses";
import { useDispatch } from "react-redux";
import { setModalAddExpenseOpen } from "@/store/modal/modal.actions";

interface CardParticipantProps {
  participant: IParticipants;
}

export function CardParticipant({ participant }: CardParticipantProps) {
  const dispatch = useDispatch();

  return (
    <Card className={cn("w-[380px]", "flex flex-col justify-between")}>
      <CardHeader>
        <CardTitle className="text-xl capitalize">{participant.name}</CardTitle>
        <CardDescription>You can edit or add more expenses.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {participant.expenses && participant.expenses.length > 0 ? (
          <>
            {participant.expenses.map((expense) => (
              <CardExpenses
                name={participant.name}
                expense={expense}
                key={expense.expense_name}
              />
            ))}
          </>
        ) : (
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <AlertCircleIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">No Expenses</p>
              <CardDescription>
                This participant have no expenses.
              </CardDescription>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setModalAddExpenseOpen(participant.name));
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add more expenses
        </Button>
      </CardFooter>
    </Card>
  );
}
