"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { Loader2, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  code: z.string().min(1, { message: "Code snippet is required" }),
  language: z.string().min(1, { message: "Programming language is required" }),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").default([]),
});

type FormValues = z.infer<typeof formSchema>;

// Available programming languages
const programmingLanguages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "ruby",
  "php",
  "rust",
  "swift",
  "kotlin",
  "dart",
  "html",
  "css",
  "sql",
  "bash",
  "powershell",
  "json",
  "yaml",
  "markdown",
  "plaintext",
];

export const CreateSnippetForm = () => {
  const router = useRouter();
  // State for temporary tag input
  const [tagInput, setTagInput] = useState("");

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      code: "",
      language: "",
      tags: [],
    },
  });

  // Create snippet mutation
  const createSnippet = api.snippet.createSnippet.useMutation({
    onSuccess: () => {
      toast.success("Snippet created successfully");
      router.push("/snippets");
    },
    onError: (error) => {
      toast.error("Failed to create snippet");
      console.log(error);
    },
  });

  // Handle tag addition
  const handleAddTag = () => {
    const currentTags = form.getValues("tags");

    if (
      tagInput?.trim() &&
      !currentTags.includes(tagInput.trim()) &&
      currentTags.length < 10
    ) {
      form.setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput(""); // Clear input after adding
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    createSnippet.mutate({
      title: values.title,
      description: values.description || "",
      code: values.code,
      language: values.language,
      tags: values.tags,
    });
  };

  return (
    <Card className="mx-auto w-full max-w-3xl shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <CardTitle className="text-2xl font-bold text-primary">
          Create Code Snippet
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a descriptive title for your code snippet"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain what your code does, its purpose, or any special instructions"
                      className="resize-none"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Programming Language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {programmingLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the programming language to enable proper syntax highlighting
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Snippet</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your code here..."
                      className="font-mono h-64 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div>
              <FormLabel>Add Tags</FormLabel>
              <div className="mt-2 flex items-center space-x-2">
                <Input
                  placeholder="Enter a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddTag}
                  disabled={
                    !tagInput.trim() || form.watch("tags").length >= 10
                  }
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {form.watch("tags").map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tag}
                    <button
                      title="Remove tag"
                      type="button"
                      className="ml-2"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormDescription className="mt-2">
                Add up to 10 tags to categorize your code snippet
              </FormDescription>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4 border-t bg-gray-50 bg-opacity-50 pb-6 pt-6 dark:bg-gray-900">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={createSnippet.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createSnippet.isPending}>
              {createSnippet.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Snippet"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};