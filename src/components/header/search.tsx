"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
  title: z.string({ required_error: "Title is required." }),
  description: z.string({ required_error: "Description is required." }),
});

type FormProps = z.infer<typeof formSchema>;

export const Seacrh = () => {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
  });

  const formSubmission =  (data: FormProps) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmission)}
        className="flex w-full gap-2 rounded-md border-2 bg-gray-50 p-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Search..."
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
