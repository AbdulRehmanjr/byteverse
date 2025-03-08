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
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { X, Tag, PenTool, Hash, HelpCircle, Send, Loader2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { api } from "~/trpc/react";
import { toast } from "sonner"


// Modify the dynamic import
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

// Extend the form schema to include the rich text content
const formSchema = z.object({
  title: z.string().min(8, { message: "Question title too short" }),
  details: z.string().min(20, {
    message: "Please provide at least 20 characters describing your problem",
  }),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(5, "Maximum 5 tags allowed"),
});

type FormProps = z.infer<typeof formSchema>;

// Popular programming tags for suggestions
const POPULAR_TAGS = [
  "javascript",
  "react",
  "nextjs",
  "typescript",
  "css",
  "html",
  "node",
  "express",
  "prisma",
  "mongodb",
  "trpc",
];

export const AskQuestionForm = () => {
  const [newTag, setNewTag] = useState<string>("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const addQuestion = api.question.addQuestion.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success('Question added successfully')
    },
    onError: ()=>{
        toast.error('Something went wrong')
    }
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      details: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (newTag.trim()) {
      const filtered = POPULAR_TAGS.filter(
        (tag) =>
          tag.toLowerCase().includes(newTag.toLowerCase()) &&
          !form.getValues("tags").includes(tag),
      ).slice(0, 5);
      setSuggestedTags(filtered);
    } else {
      setSuggestedTags([]);
    }
  }, [newTag, form]);

  const addTag = (tag: string = newTag) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag) {
      const currentTags = form.getValues("tags") ?? [];
      if (currentTags.length < 5 && !currentTags.includes(trimmedTag)) {
        form.setValue("tags", [...currentTags, trimmedTag], {
          shouldValidate: true,
        });
        setNewTag("");
        setSuggestedTags([]);
      }
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  const handleEditorChange = (content: string) => {
    form.setValue("details", content, { shouldValidate: true });
  };

  const onSubmit = (data: FormProps) => {
    addQuestion.mutate({
      title: data.title,
      details: data.details,
      tags: data.tags,
    });
  };

  // Quill editor modules and formats configuration
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
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardContent className="p-0">
        <Alert className="mb-6 flex items-center border-blue-100 bg-blue-50">
          <HelpCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            Before posting, search to see if your question has been answered
            already.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-xl font-semibold">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. How do I center a div with Tailwind CSS?"
                      {...field}
                      value={field.value ?? ""}
                      className="p-3 text-base font-medium"
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific and imagine you&apos;re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-xl font-semibold">
                    Problem Details
                  </FormLabel>
                  <FormDescription className="mb-2">
                    Introduce the problem and expand on what you put in the
                    title. Include code examples if relevant.
                  </FormDescription>

                  <FormControl>
                    {isMounted && (
                      <div className="overflow-hidden rounded-md border bg-white">
                        <ReactQuill
                          theme="snow"
                          modules={modules}
                          value={field.value}
                          onChange={handleEditorChange}
                          placeholder="Describe your problem in detail..."
                          className="h-[300px] bg-white"
                        />
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-heading text-xl font-semibold">
                    <Tag className="h-5 w-5" /> Tags
                  </FormLabel>
                  <FormDescription className="mb-2">
                    Add up to 5 tags to describe what your question is about.
                    Tags help connect your question with experts.
                  </FormDescription>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Hash className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="e.g. javascript, react, nextjs"
                          className="pl-10"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                        />
                        {suggestedTags.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                            <ul className="py-1">
                              {suggestedTags.map((tag) => (
                                <li
                                  key={tag}
                                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                                  onClick={() => addTag(tag)}
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <Button
                        type="button"
                        onClick={() => addTag()}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>

                    {field.value && field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                          >
                            <span>{tag}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 text-blue-500 hover:bg-transparent hover:text-blue-700"
                              onClick={() => removeTag(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="border-t pt-4">
              <Button
                type="submit"
                className="gap-2 px-6 py-2"
                size="lg"
                disabled={addQuestion.isPending}
              >
                {addQuestion.isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Post Your Question
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
