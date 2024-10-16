import { z } from "zod";

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number() 
})

const createExpenseSchema = expenseSchema.omit({ id: true });

export { 
    createExpenseSchema,
    expenseSchema
 };