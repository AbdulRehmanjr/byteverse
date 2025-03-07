"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  PenTool,
  HelpCircle,
  Send,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useLoginDialog } from "~/hooks/use-login";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="flex h-48 w-full items-center justify-center rounded-md border border-dashed">
      <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground">
        <PenTool className="h-6 w-6 animate-pulse" />
        <p>Loading editor...</p>
      </div>
    </div>
  ),
});

const formSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Response must be at least 10 characters" }),
});

type FormProps = z.infer<typeof formSchema>;

export const AddResponseForm = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const { setIsLoginOpen } = useLoginDialog();
  const utils = api.useUtils();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const addResponse = api.answer.addAnswer.useMutation({
    onSuccess: async () => {
      form.reset();
      setIsMounted(false);
      toast.success("Response added successfully");
      await utils.answer.getAnswersByQuestionId.refetch({ questionId });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleEditorChange = (content: string) => {
    form.setValue("content", content, { shouldValidate: true });
  };

  const onSubmit = (data: FormProps) => {
    if (session.data) {
      addResponse.mutate({
        questionId,
        content: data.content,
      });
    } else {
      setIsLoginOpen(true);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block", "code"],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="grid place-items-center gap-2">
      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={() => setIsMounted(true)}
          className="gap-2 border-primary/30 hover:bg-primary"
        >
          <MessageCircle className="h-4 w-4" />
          Add your response
        </Button>
        {isMounted ? (
          <Button
            variant="outline"
            onClick={() => setIsMounted(false)}
            className="gap-2 border-primary/30 hover:bg-primary/5"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            Cancel
          </Button>
        ) : null}
      </div>

      {isMounted ? (
        <Card className="w-full border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <Alert className="mb-6 flex items-center border-blue-100 bg-blue-50">
              <HelpCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-gray-950">
                Be respectful and provide constructive feedback in your
                response.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading text-xl font-semibold text-primary">
                        Your Response
                      </FormLabel>
                      <FormDescription className="mb-2 text-gray-950">
                        Share your knowledge, experience, or solution to help
                        answer this question.
                      </FormDescription>

                      <FormControl>
                        {isMounted && (
                          <div className="overflow-hidden rounded-md border border-primary/30 bg-white">
                            <ReactQuill
                              theme="snow"
                              modules={modules}
                              value={field.value}
                              onChange={handleEditorChange}
                              placeholder="Write your response here..."
                              className="h-[15rem] bg-white"
                            />
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t pt-4">
                  <Button
                    type="submit"
                    className="gap-2 px-6 py-2"
                    size="lg"
                    disabled={addResponse.isPending}
                  >
                    {addResponse.isPending ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Post Your Response
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};
