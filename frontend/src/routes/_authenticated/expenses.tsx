import { api } from '@/lib/api'
// import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Expense } from '@server/db/schema/expenses'

export const Route = createFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

// Fetch the total spent from server
// async function getAllExpenses() {
//   // api is an abstraction layer
//   const res = await api.expenses.$get()

//   if (!res.ok) {
//     throw new Error('server error')
//   }
//   const data = await res.json()
//   return data
// }

function Expenses() {
  // Tanstack query
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['get-all-expenses'],
  //   queryFn: getAllExpenses,
  // })

  const [total, setTotal] = useState<{ total: string | null } | null>(null);
  const [data, setData] = useState<{ expenses: Expense[] } | null>(null);

  // todo - are loading states being set back to true correctly?
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const expenseTotal = new Intl.NumberFormat('en-US').format(Number(total?.total));

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await api.expenses.$get();
        if (!response.ok) throw new Error('Error Fetching Expenses');
        const resData = await response.json();
        setData(resData)
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchTotal() {
      try {
        const response = await api.expenses['total-spent'].$get();
        if (!response.ok) throw new Error('Error Fetching Total');
        const resData = await response.json();
        setTotal(resData); 
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
    fetchTotal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{`$ ${expenseTotal}`}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
