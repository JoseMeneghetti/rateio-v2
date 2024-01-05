"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { setModalCreateClose } from "@/store/modal/modal.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dynamicSchema,
  modalformSchema,
} from "@/app/(dashboard)/(routes)/create-rateio/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageIcon, PlusCircleIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useState } from "react";
import PopoverIcons from "../common/popover-icons";
import Image from "next/image";
import {
  setRateioParticipants,
  setEditRateioParticipants,
} from "@/store/rateios/rateios.actions";

interface ModalNewParticipantProps {
  edit?: boolean;
}

const ModalNewParticipant = ({ edit }: ModalNewParticipantProps) => {
  const [enableExpenses, setEnableExpenses] = useState(false);
  const [icon, setIcon] = useState<string>("");
  const { modalCreate } = useAppSelector((state: RootState) => state.modal);
  const dispatch = useAppDispatch();

  const setParticipants = edit
    ? setEditRateioParticipants
    : setRateioParticipants;

  const onClose = () => {
    dispatch(setModalCreateClose());
    setIcon("");
  };

  const validationSchema = enableExpenses ? modalformSchema : dynamicSchema;

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      expense_name: "",
      expense_value: "",
    },
  });

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    try {
      if (!Number(values.expense_value)) {
        dispatch(
          setParticipants({
            name: values.name ?? "",
            expenses: [],
          })
        );
      } else {
        dispatch(
          setParticipants({
            name: values.name ?? "",
            expenses: [
              {
                expense_name: values.expense_name ?? "",
                expense_value: Number(values.expense_value) ?? 0,
                icon: icon ?? null,
              },
            ],
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={modalCreate.isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Adding a new Participant
              <Badge className="uppercase text-sm py-1" variant="default">
                New
              </Badge>
            </div>
          </DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-1 gap-4"
              >
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Participant Name</FormLabel>
                      <FormMessage className="text-xs" />
                      <FormControl className="m-0 p-0">
                        <Input
                          className="px-4 border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          // disabled={isLoading}
                          placeholder="Eg. Joseph Richards"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Participant Expenses</Label>
                    <p>Enable if the participant have expenses.</p>
                  </div>
                  <div>
                    <Switch
                      checked={enableExpenses}
                      onCheckedChange={setEnableExpenses}
                      aria-readonly
                    />
                  </div>
                </div>
                {enableExpenses && (
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
                )}

                <Button className="flex gap-2 items-center">
                  <PlusCircleIcon />
                  Add This Partcipant
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalNewParticipant;
