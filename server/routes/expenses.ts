import { Hono } from "hono"
import { zValidator } from '@hono/zod-validator'
import { getUser } from "../kinde"
import { db } from "../db"
import { expenses as expensesTABLE } from "../db/schema/expenses"
import { and, desc, eq, sum } from 'drizzle-orm'
import { createExpenseSchema } from '../sharedTypes'

export const expensesRoute = new Hono()
.get("/", getUser, async (c) => {
    const user = c.var.user 
    const expenses = await db
        .select()
        .from(expensesTABLE)
        .where(eq(expensesTABLE.userId, user.id)) // db query
        .orderBy(desc(expensesTABLE.createdAt))
        .limit(100);

    return c.json({ expenses: expenses })
})
.post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json")
    const user = c.var.user;

    const result = await db.insert(expensesTABLE).values({
        ...expense,
        amount: expense.amount.toString(),
        userId: user.id
    }).returning()

    c.status(201);
    return c.json(result)
})
.get("/total-spent", getUser, async (c) => {
    const user = c.var.user;
    const result = await db
        .select( { total: sum(expensesTABLE.amount) })
        .from(expensesTABLE)
        .where(eq(expensesTABLE.userId, user.id))
        .limit(1)
        .then(res => res[0])

    return c.json(result);
})
.get("/:id{[0-9]+}", getUser, async (c) => { // this route gets an expense by the ID
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user

    const expense = await db
        .select( { total: sum(expensesTABLE.amount) })
        .from(expensesTABLE)
        .where(and(eq(expensesTABLE.userId, user.id), eq(expensesTABLE.id, id)))
        .then(res => res[0])

    if (!expense) {
        return c.notFound();
    }

    return c.json(expense);
})
.delete("/:id{[0-9]+}", getUser, async (c) => { // this route gets an expense by the ID, and deletes it
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user

    const expense = await db
        .delete(expensesTABLE)
        .where(and(eq(expensesTABLE.userId, user.id), eq(expensesTABLE.id, id)))
        .returning()
        .then((res) => res[0])

    if (!expense) {
        return c.notFound();
    }

    return c.json({ expense: expense });
})