import { numeric, text, pgTable, serial, index, timestamp } from 'drizzle-orm/pg-core';

// EXPENSES TABLE
export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  // i.e. 12,4234569234 -> 12,42
  amount: numeric('amount', {precision: 12, scale: 2}).notNull(),
  createdAt: timestamp('created_at').defaultNow()
}, (expenses) => {
  return {
    userIdIndex: index('name_idx').on(expenses.userId), // indexes are for performance?
  }
});


// This is a type workaround for handling createdAt being Date() in db but string in API response
export type ExpenseInferred = typeof expenses.$inferSelect;
export type Expense = Omit<ExpenseInferred, 'createdAt'> & {
  createdAt: string | null;
};