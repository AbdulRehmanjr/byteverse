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
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
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
import { api } from "~/trpc/react";
import { toast } from "sonner";

const SignUpSchema = z.object({
  email: z
    .string({ required_error: "Email is requied" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is requied" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  userName : z.string({required_error:"Field is required."})
});

type FormProps = z.infer<typeof SignUpSchema>;

export const SignUpDialog = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<FormProps>({
    resolver: zodResolver(SignUpSchema),
  });

  const createUser = api.register.addUser.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Signup succesfully")
    },
    onError: ()=>{
      toast.error("Signup failed")
    }
  });

  const onSubmit = (data: FormProps) => {
    createUser.mutate({ email: data.email, password: data.password ,userName:data.userName});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" type="button">
          Sign up
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
            Join ByteVerse
          </DialogTitle>
          <DialogDescription className="sr-only">Signup form</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="spydev"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Write your username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormDescription>Write your email address</FormDescription>
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
                        placeholder=""
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
                  <FormDescription>Write your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={createUser.isPending}
            >
              {createUser.isPending ? (
                <>
                  <Loader className="animate-spin" />
                  Please wait...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
