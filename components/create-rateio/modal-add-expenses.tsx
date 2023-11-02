import { expensesSchema } from "@/app/(dashboard)/(routes)/create-rateio/constants";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setModalAddExpenseClose } from "@/store/modal/modal.actions";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import { Button } from "../ui/button";
import { ImageIcon, PlusCircleIcon } from "lucide-react";
import PopoverIcons from "./popover-icons";
import { setNewExpense } from "@/store/rateios/rateios.actions";

const ModalAddExpenses = () => {
  const [icon, setIcon] = useState<string>("");
  const dispatch = useAppDispatch();
  const { modalAddExpense } = useAppSelector((state: RootState) => state.modal);

  const onClose = () => {
    dispatch(setModalAddExpenseClose());
    setIcon("");
  };

  const form = useForm<z.infer<typeof expensesSchema>>({
    resolver: zodResolver(expensesSchema),
    defaultValues: {
      expense_name: "",
      expense_value: "",
    },
  });

  const onSubmit = (values: z.infer<typeof expensesSchema>) => {
    try {
      dispatch(
        setNewExpense({
          name: modalAddExpense.name,
          expense: {
            expense_name: values.expense_name ?? "",
            expense_value: Number(values.expense_value) ?? 0,
            icon: icon ?? null,
          },
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={modalAddExpense.isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Adding a new Expense
              <Badge className="uppercase text-sm py-1" variant="default">
                + Expense
              </Badge>
            </div>
          </DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-1 gap-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <FormField
                      name="expense_name"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Expense Name</FormLabel>
                          <FormMessage className="text-xs" />
                          <FormControl className="m-0 p-0">
                            <Input
                              className="px-4 border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                              // disabled={isLoading}
                              placeholder="Eg. Barbecue, beer, or other..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="expense_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expense Value</FormLabel>
                          <FormMessage className="text-xs" />
                          <FormControl className="m-0 p-0">
                            <Input
                              type="number"
                              className="px-4 border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                              // disabled={isLoading}
                              placeholder="Eg. 100"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Choose an Icon</Label>
                      <p>Choose an icon that represents the expense.</p>
                    </div>
                    <div>
                      <Popover modal={true}>
                        <PopoverTrigger>
                          {icon ? (
                            <Image
                              src={`/icons/${icon}.png`}
                              width={50}
                              height={50}
                              alt={"icon"}
                            />
                          ) : (
                            <Button
                              className="flex gap-2 items-center"
                              type="button"
                            >
                              <ImageIcon />
                              Icon
                            </Button>
                          )}
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverIcons setIcon={setIcon} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <Button className="flex gap-2 items-center">
                  <PlusCircleIcon />
                  Add Expense
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddExpenses;
