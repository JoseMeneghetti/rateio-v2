"use client";

import Heading from "@/components/common/heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, SplitIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setModalCreateOpen,
  setModalGenerateOpen,
} from "@/store/modal/modal.actions";
import ModalNewParticipant from "@/components/create-rateio/modal-new-participant";
import { setRateioName } from "@/store/rateios/rateios.actions";
import { IParticipants } from "@/store/rateios/rateios.reducer";
import { CardParticipant } from "@/components/create-rateio/card-participant";
import ModalAddExpenses from "@/components/create-rateio/modal-add-expenses";
import ModalEditParticipant from "@/components/create-rateio/modal-edit-participant";
import ModalDeleteParticipant from "@/components/create-rateio/modal-delete-expense";
import ModalGenerate from "@/components/create-rateio/modal-generate";
import {
  selectActiveParticipants,
} from "@/store/rateios/rateios.selectors";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export default function Page() {
  const [nameRateio, setNameRateio] = useState("");
  const debouncedNameRateio = useDebounce<string>(nameRateio, 500);

  const participants = useAppSelector(selectActiveParticipants);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log(values);
  // };

  useEffect(() => {
    if (nameRateio) {
      dispatch(setRateioName(nameRateio));
    }
  }, [debouncedNameRateio]);

  return (
    <div className="p-4 lg:px-8">
      <Heading
        title="Create a new Rateio"
        description="Create your rateio, name it, add all people that will participate and add their expences."
        icon={SplitIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="flex flex-col">
        <div className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md">
          <div className="flex lg:px-40 ">
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="flex-grow gap-4 flex flex-col"
              >
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Name your Rateio</FormLabel>
                      <FormControl className="m-0 p-0">
                        <Input
                          className="px-4 border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          // disabled={isLoading}
                          placeholder="Name your rateio"
                          onChangeCapture={(e) =>
                            setNameRateio(e.currentTarget.value)
                          }
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  className="flex gap-4 items-center w-full"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setModalCreateOpen());
                  }}
                  disabled={nameRateio.length < 1}
                >
                  <PlusCircleIcon />
                  New Participant
                </Button>

                <Button
                  className="w-full"
                  disabled={participants.length < 2}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setModalGenerateOpen());
                  }}
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>
          <div className="flex flex-wrap justify-center gap-8 lg:p-8 py-8 ">
            {participants &&
              participants.map((participant: IParticipants) => (
                <CardParticipant
                  key={participant.name}
                  participant={participant}
                />
              ))}
          </div>
        </div>
      </div>

      <ModalNewParticipant />
      <ModalAddExpenses />
      <ModalEditParticipant />
      <ModalDeleteParticipant />
      <ModalGenerate />
    </div>
  );
}
