'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  title: z.string({ required_error: "Title is reqired" }),
  description: z.string({ required_error: "Description is required" })


});
type FormProps = z.infer<typeof formSchema>

export const TaskForm = () => {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
  });

  const formSubmission = (data: FormProps) => {
    console.log(data)

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmission)} className="flex gap-2"></form>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Enter Title here</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} value={field.value ?? 'S'}/>

            </FormControl>
            <FormDescription>This s form show  the description  of  the titel bar </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>

  );
}



// function useform<T>(arg0: { resolver: <TFieldValues extends import("react-hook-form").FieldValues, TContext>(values: TFieldValues, context: TContext | undefined, options: import("react-hook-form").ResolverOptions<TFieldValues>) => Promise<import("react-hook-form").ResolverResult<TFieldValues>>; }) {
//     throw new Error("Function not implemented.");

// function useform<T>(arg0: { resolver: <TFieldValues extends import("react-hook-form").FieldValues, TContext>(values: TFieldValues, context: TContext | undefined, options: import("react-hook-form").ResolverOptions<TFieldValues>) => Promise<import("react-hook-form").ResolverResult<TFieldValues>>; }) {
//     throw new Error("Function not implemented.");

// function useform<T>(arg0: { resolver: <TFieldValues extends import("react-hook-form").FieldValues, TContext>(values: TFieldValues, context: TContext | undefined, options: import("react-hook-form").ResolverOptions<TFieldValues>) => Promise<import("react-hook-form").ResolverResult<TFieldValues>>; }) {
//     throw new Error("Function not implemented.");

