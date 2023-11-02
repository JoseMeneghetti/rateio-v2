import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const modalformSchema = z.object({
  name: z.string().min(1, {
    message: "Participant name is required",
  }),
  expense_name: z.string().min(1, {
    message: "Expense name is required",
  }),
  expense_value: z.string().min(1, {
    message: "Expense value is required",
  }),
});

export const dynamicSchema = z.object({
  name: z.string().min(1, {
    message: "Participant name is required",
  }),
  expense_name: z.string().optional(),
  expense_value: z.string().optional(),
});

export const expensesSchema = z.object({
  expense_name: z.string().min(1, {
    message: "Expense name is required",
  }),
  expense_value: z.string().min(1, {
    message: "Expense value is required",
  }),
});
