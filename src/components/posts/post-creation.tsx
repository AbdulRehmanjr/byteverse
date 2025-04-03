"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import Image from "next/image";
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
import { UploadButton } from "~/utils/uploadthing";

// Define the form schema
const formSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  hashTags: z.array(z.string()).max(10, "Maximum 10 tags allowed").default([]),
  image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const CreatePostForm = () => {
  const router = useRouter();
  // State for temporary tag input
  const [tagInput, setTagInput] = useState("");

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      hashTags: [],
      image: "",
    },
  });

  // Create post mutation
  const createPost = api.post.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create post");
      console.log(error);
    },
  });

  // Handle hashtag addition
  const handleAddHashTag = () => {
    const currentTags = form.getValues("hashTags");

    if (
      tagInput?.trim() &&
      !currentTags.includes(tagInput.trim()) &&
      currentTags.length < 10
    ) {
      form.setValue("hashTags", [...currentTags, tagInput.trim()]);
      setTagInput(""); // Clear input after adding
    }
  };

  // Handle hashtag removal
  const handleRemoveHashTag = (tagToRemove: string) => {
    const currentTags = form.getValues("hashTags");
    form.setValue(
      "hashTags",
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    createPost.mutate({
      content: values.content,
      image: values.image ?? "",
      hashTags: values.hashTags,
    });
  };

  return (
    <Card className="mx-auto w-full max-w-3xl shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <CardTitle className="text-2xl font-bold text-primary">
          Create Post
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            {/* Post Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What&apos;s on your mind?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts..."
                      className="min-h-32 resize-none"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add an image</FormLabel>
                  <FormControl>
                    <div className="grid gap-4">
                      {field.value ? (
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                          <Image
                            src={field.value}
                            alt="Post image"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full"
                            onClick={() => form.setValue("image", "")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex min-h-32 items-center justify-center rounded-lg border-2 border-dashed border-primary/20 p-4">
                          <div className="text-center">
                            <UploadButton
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                form.setValue(
                                  "image",
                                  res[0]?.ufsUrl ?? "/placeholder.png",
                                );
                                toast.success("Image uploaded successfully");
                              }}
                              onUploadError={(error: Error) => {
                                toast.error(`Upload failed: ${error.message}`);
                              }}
                              appearance={{
                                button:
                                  "bg-primary text-primary-foreground hover:bg-primary",
                                allowedContent: "text-muted-foreground text-xs",
                              }}
                            />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Supports JPG, PNG and GIF up to 4MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hashtags */}
            <div>
              <FormLabel>Add hashtags</FormLabel>
              <div className="mt-2 flex items-center space-x-2">
                {/* Using regular input, not FormField, for temporary input state */}
                <Input
                  placeholder="Enter a hashtag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddHashTag}
                  disabled={
                    !tagInput.trim() || form.watch("hashTags").length >= 10
                  }
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {form.watch("hashTags").map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    #{tag}
                    <button
                      title="Remove hashtag"
                      type="button"
                      className="ml-2"
                      onClick={() => handleRemoveHashTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormDescription className="mt-2">
                Add up to 10 hashtags to categorize your post
              </FormDescription>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4 border-t bg-gray-50 bg-opacity-50 pb-6 pt-6 dark:bg-gray-900">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={createPost.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createPost.isPending}>
              {createPost.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
