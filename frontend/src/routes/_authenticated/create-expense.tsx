import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { api } from '@/lib/api'
import { z } from "zod";
import { createExpenseSchema } from '@server/sharedTypes'

type CreateExpenseFormValues = z.infer<typeof createExpenseSchema>

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()

  const form = useForm<CreateExpenseFormValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: '',
      amount: '10',
    },
  })

  const onSubmit = async (values: CreateExpenseFormValues) => {
    const res = await api.expenses.$post({ json: values })

    if (!res.ok) {
      throw new Error('server error')
    }

    console.log(values)
    navigate({ to: '/expenses' })
  }

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl m-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Amount"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Create Expense</Button>
        </form>
      </Form>
    </div>
  )
}
