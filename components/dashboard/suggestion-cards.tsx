import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserCircle2Icon } from "lucide-react";

interface SuggestionCardsProps {
  name: string;
  value: number;
  receives?: { receiveFrom: string; receiveValue: number }[];
  pays?: { pays: string; payValue: number }[];
}

const SuggestionCards = ({
  name,
  value,
  receives,
  pays,
}: SuggestionCardsProps) => {
  return (
    <Card className={cn("flex flex-col")}>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center capitalize">
          <UserCircle2Icon width={50} height={50} /> {name}
        </CardTitle>
      </CardHeader>
      <CardContent className=" gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          {receives && receives.length > 0 && (
            <div className="flex-1 space-y-1">
              <CardTitle className="text-base">Receives</CardTitle>
              {receives.map((receive,idx) => (
                <div key={idx} className="flex justify-between px-2">
                  <CardDescription className="capitalize">
                    {receive.receiveFrom}
                  </CardDescription>
                  <CardDescription>
                    <strong className="text-green-500 text-xl">+</strong>
                    U$ {receive.receiveValue.toFixed(2)}
                  </CardDescription>
                </div>
              ))}
            </div>
          )}

          {pays && pays.length > 0 && (
            <div className="flex-1 space-y-1">
              <CardTitle className="text-base">Pays</CardTitle>
              {pays.map((pay, idx) => (
                <div key={idx} className="flex justify-between px-2">
                  <CardDescription className="capitalize">
                    {pay.pays}
                  </CardDescription>
                  <CardDescription>
                    <strong className="text-red-500 text-xl">-</strong>
                    U$ {pay.payValue.toFixed(2)}
                  </CardDescription>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestionCards;
