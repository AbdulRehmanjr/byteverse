"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type FormProps = z.infer<typeof LoginSchema>;

export const LoginDialog = () => {
  const form = useForm<FormProps>({
    resolver: zodResolver(LoginSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" type="button">
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2">
          <div className="relative h-12 w-24">
            <Image
              src="/symbol.png"
              alt="ByteVerse Logo"
              fill
              sizes="100%"
              className="object-contain"
              priority
            />
          </div>
          <DialogTitle className="font-heading text-xl">
            Welcome Back to ByteVerse
          </DialogTitle>
          <DialogDescription className="sr-only">Login form</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="name@example.com"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Enter your email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="************"
                        {...field}
                        value={field.value ?? ""}
                        className="rounded-r-none border-r-0"
                      />
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="rounded-l-none border-l-0"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
