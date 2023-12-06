import { z } from "zod";

const listForResult = z.object({
  participant: z.string().optional(),
  expenses: z.number().optional(),
});

const names = z.object({
  name: z.string().optional(),
  value: z.number().optional(),
});

const whoPaid = z.object({
  expense: z.string().optional(),
  value: z.number().optional(),
  icon: z.string().optional(),
  names: z.array(names).optional(),
});

const suggestionItem = z.object({
  name: z.string().optional(),
  value: z.number().optional(),
  receives: z
    .nullable(
      z.array(z.object({ receiveFrom: z.string(), receiveValue: z.number() }))
    )
    .optional(),
  pays: z
    .nullable(z.array(z.object({ pays: z.string(), payValue: z.number() })))
    .optional(),
});

const ExpenseSchema = z.object({
  expense_name: z.string().optional(),
  expense_value: z.number().optional(),
  icon: z.string().optional(),
});

const ParticipantsSchema = z.object({
  name: z.string().optional(),
  expenses: z.array(ExpenseSchema).optional(),
});

export const resultSchema = z.object({
  nameRateio: z.string().optional(),
  whoPaid: z.array(whoPaid).optional(),
  listForResult: z.array(listForResult).optional(),
  onlyParticipants: z.array(names).optional(),
  sumOfPaids: z.array(names).optional(),
  total: z.array(names).optional(),
  suggestion: z.array(suggestionItem).optional(),
  password: z.string().optional(),
  participants: z.array(ParticipantsSchema).optional(),
});

export const rateioAuthSchema = z.object({
  id: z.string(),
  password: z.string(),
  user_id: z.string().optional(),
});
