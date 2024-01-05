"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setModalGenerateClose } from "@/store/modal/modal.actions";

import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import Image from "next/image";
import { ImageIcon, InfoIcon } from "lucide-react";
import { ISuggestionItem } from "@/store/rateios/rateios.reducer";
import {
  selectActiveNomeRateio,
  selectActiveParticipants,
  selectEditNomeRateio,
  selectEditParticipants,
} from "@/store/rateios/rateios.selectors";
import { selectModalGenerate } from "@/store/modal/modal.selectors";
import { useParams, useRouter } from "next/navigation";
import {
  setActiveRateio,
  setEditRateio,
  setResetActiveRateio,
  setClearEditRateio,
} from "@/store/rateios/rateios.actions";
import { rateioEdit } from "@/service/rateio/rateio-service";
import { toast, useToast } from "../ui/use-toast";

const formSchema = z.object({
  expenses: z.array(
    z.object({
      expense: z.string(),
      value: z.number(),
      icon: z.string(),
      names: z.array(
        z.object({
          name: z.string(),
          checked: z.boolean(),
        })
      ),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export interface IExpensesShare {
  expense: string;
  value: number;
  icon: string;
  names: { name: string; checked: boolean }[];
}

interface ModalGenerateProps {
  edit?: boolean;
}

const ModalGenerate = ({ edit }: ModalGenerateProps) => {
  const modalGenerate = useAppSelector(selectModalGenerate);

  const editParticipants = useAppSelector(selectEditParticipants);
  const activeParticipants = useAppSelector(selectActiveParticipants);
  const editNomeRateio = useAppSelector(selectEditNomeRateio);
  const activeNomeRateio = useAppSelector(selectActiveNomeRateio);

  const participants = edit ? editParticipants : activeParticipants;

  const nameRateio = edit ? editNomeRateio : activeNomeRateio;

  const [controlDivision, setControlDivision] = useState<IExpensesShare[]>();
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();

  const onClose = () => {
    dispatch(setModalGenerateClose());
  };

  const setActive = edit ? setEditRateio : setActiveRateio;
  const setReset = edit ? setClearEditRateio : setResetActiveRateio;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values) {
        const findHowManyPayWithoutDiferences = values.expenses.map(
          (expense) => {
            const numChecked = expense.names.filter(
              (person) => person.checked
            ).length;

            const costPerPerson = expense.value / numChecked;

            const participants = expense.names
              .filter((person) => person.checked)
              .map((person) => ({
                name: person.name,
                value: costPerPerson,
              }));

            return {
              expense: expense.expense,
              value: expense.value,
              icon: expense.icon,
              names: participants,
            };
          }
        );

        const listForResult = participants.reduce(
          (total: { participant: string; expenses: number }[], currentEl) => {
            const totalExp = currentEl.expenses.reduce(
              (totalEx: number, currentEl) => totalEx + currentEl.expense_value,
              0
            );

            return [
              ...total,
              {
                participant: currentEl.name,
                expenses: totalExp,
              },
            ];
          },
          []
        );

        const onlyParticipants = findHowManyPayWithoutDiferences.reduce(
          (total: { name: string; value: number }[], currentElement) => [
            ...total,
            ...currentElement.names,
          ],
          []
        );

        const sumOfPaids = onlyParticipants.reduce(
          (total: { name: string; value: number }[], currentElement) => {
            const findName = total.find(
              (el) => el.name === currentElement.name
            );

            if (findName) {
              findName.value += currentElement.value;
              return [...total];
            }
            return [
              ...total,
              {
                name: currentElement.name,
                value: currentElement.value,
              },
            ];
          },
          []
        );

        const total = sumOfPaids
          .map((sum) => {
            const findWhoPaid = listForResult.find(
              (participants) => participants.participant === sum.name
            );

            if (findWhoPaid) {
              return {
                name: sum.name,
                value: Number(findWhoPaid?.expenses - sum.value),
              };
            }
          })
          .filter(
            (item): item is { name: string; value: number } =>
              item !== undefined
          )
          .sort((a, b) => b?.value - a?.value);

        const total2 = structuredClone(total);

        if (total2 && total2.length > 0) {
          const suggestion: ISuggestionItem[] = total2.reduce(
            (totalSuggestion: any, currentElement: any) => {
              if (currentElement && Number(currentElement.value) >= 0) {
                return [
                  ...totalSuggestion,
                  {
                    name: currentElement.name,
                    value: currentElement.value,
                  },
                ];
              }

              totalSuggestion.forEach((sugestionItem: any) => {
                if (
                  sugestionItem.value === 0 ||
                  (currentElement && Number(currentElement.value) === 0)
                ) {
                  return;
                }

                const sumItems =
                  currentElement &&
                  Number(sugestionItem.value) + Number(currentElement.value);

                if (sumItems && sumItems >= 0) {
                  sugestionItem.value = sumItems;

                  if (!sugestionItem.receives) {
                    sugestionItem.receives = [];
                  }

                  sugestionItem.receives.push({
                    receiveFrom: currentElement.name,
                    receiveValue: currentElement.value,
                  });

                  if (!currentElement.pays) {
                    currentElement.pays = [];
                  }

                  currentElement.pays.push({
                    pays: sugestionItem.name,
                    payValue: currentElement.value,
                  });

                  currentElement.value = 0;
                } else {
                  if (!currentElement.pays) {
                    currentElement.pays = [];
                  }
                  currentElement.pays.push({
                    pays: sugestionItem.name,
                    payValue: sugestionItem.value,
                  });

                  if (!sugestionItem.receives) {
                    sugestionItem.receives = [];
                  }

                  currentElement &&
                    sugestionItem.receives.push({
                      receiveFrom: currentElement.name,
                      receiveValue: sugestionItem.value,
                    });

                  sugestionItem.value = 0;
                  currentElement.value = sumItems;
                }
              });

              if (
                currentElement &&
                !totalSuggestion.find(
                  (el: any) => el.name === currentElement.name
                )
              ) {
                return [...totalSuggestion, currentElement];
              }

              return [...totalSuggestion];
            },
            []
          );

          const newRateio = {
            participants: participants,
            whoPaid: findHowManyPayWithoutDiferences,
            listForResult,
            onlyParticipants,
            sumOfPaids,
            total,
            suggestion,
            nameRateio: nameRateio,
          };

          if (params.id && typeof params.id === "string") {
            try {
              const saved = await rateioEdit(newRateio, params.id);
              router.refresh();
              dispatch(setReset());
              toast({
                title: "Success!",
                description: "Your rateio has been create successefully",
              });
              router.push(`/dashboard/${saved.data.id}`);
            } catch {
              toast({
                variant: "destructive",
                title: "Error!",
                description:
                  "An error happened trying to create your rateio. Please enter in contact.",
              });
            }
          } else {
            dispatch(setActive(newRateio));
            router.push("/dashboard");
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const form = useForm<FormValues>({
    mode: "onChange",
  });

  const { control, handleSubmit, getValues } = form;

  const { fields, replace } = useFieldArray({
    control,
    name: "expenses",
  });

  const getValuesExpenses = () => {
    setTimeout(() => {
      const exp = getValues(`expenses`);
      setControlDivision(structuredClone(exp));
    }, 500);
  };

  const handleDivision = (value: number, index: number) => {
    if (controlDivision && value) {
      const division = controlDivision[index]?.names?.filter(
        (el: any) => el.checked
      ).length;

      if (typeof division === "number" && division > 0) {
        return value / division;
      }
      return 0;
    }
    return 0;
  };

  useEffect(() => {
    if (participants.length > 0) {
      const names = participants.map((item) => {
        return { name: item.name, checked: true };
      });

      const transformedArray = participants.reduce(
        (total: IExpensesShare[], current) => {
          if (current.expenses.length < 1) {
            return total;
          }
          const expenses = current.expenses.map((expense) => {
            return {
              expense: expense.expense_name,
              value: expense.expense_value,
              icon: expense.icon,
              names: names,
            };
          });

          return [...total, ...expenses];
        },
        []
      );

      if (transformedArray.length > 0) {
        replace(transformedArray);
        setControlDivision(transformedArray);
      }
    }
  }, [participants, replace]);

  return (
    <Dialog open={modalGenerate.isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[70%] max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1 capitalize">
              Expense Share
              <Badge className="uppercase text-sm py-1" variant="default">
                Generate
              </Badge>
            </div>
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-8"
            >
              <div className="flex justify-around gap-4 flex-wrap">
                {fields?.map((el, index) => (
                  <div
                    key={el.id}
                    className="flex flex-col flex-grow gap-4 border p-4 rounded-lg max-w-[433px]"
                  >
                    <div className="flex justify-start gap-8 items-start">
                      <div className="flex flex-row justify-start flex-grow gap-8">
                        <FormLabel className="capitalize text-xl">
                          {el.expense}
                        </FormLabel>
                      </div>
                      {/* <FormLabel className="text-base capitalize">
                          Value
                          <FormDescription>{el.value}</FormDescription>
                        </FormLabel> */}
                      <div>
                        {el.icon ? (
                          <Image
                            src={`/icons/${el.icon}.png`}
                            width={50}
                            height={50}
                            alt={"icon"}
                          />
                        ) : (
                          <ImageIcon />
                        )}
                      </div>
                    </div>
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                      <InfoIcon />
                      <div className="flex-1 space-y-2">
                        {/* <p className="text-sm font-medium leading-none">
                          Values info
                        </p> */}
                        <div className="flex justify-around">
                          <div className="rounded-md border p-2">
                            <FormLabel>
                              Expense Value
                              <FormDescription>
                                U$ {el.value.toFixed(2)}
                              </FormDescription>
                            </FormLabel>
                          </div>
                          <div className="rounded-md border p-2">
                            <FormLabel>
                              Division/Person
                              <FormDescription>
                                U$
                                {handleDivision(el.value, index).toFixed(2)}
                              </FormDescription>
                            </FormLabel>
                          </div>
                        </div>
                      </div>
                    </div>
                    {el.names.map((nameObj, i) => (
                      <FormField
                        key={nameObj.name}
                        control={control}
                        name={`expenses.${index}.names.${i}.checked`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                {nameObj.name}
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                onClick={() => getValuesExpenses()}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-8">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Generate</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalGenerate;
