"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Save, Plus, X, Camera } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";

const userProfileSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(2, "Role is required"),
  company: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  dp: z.string().optional(),

  // Links
  githubUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  websiteUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  // Privacy & Settings
  isVerified: z.boolean().default(false),
  isTopContributor: z.boolean().default(false),
  receiveNotifications: z.boolean().default(true),
  showEmail: z.boolean().default(false),
});

type UserProfileValues = z.infer<typeof userProfileSchema>;

export const ProfileForm = () => {
  const router = useRouter();
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const [initialProfile] = api.profile.getUserProfile.useSuspenseQuery();

  const form = useForm<UserProfileValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      userName: "",
      email: "",
      role: initialProfile.role ?? "",
      company: "",
      location: "",
      bio: "",
      githubUrl: "",
      websiteUrl: "",
      dp: "",
      isVerified: false,
      isTopContributor: false,
      receiveNotifications: false,
      showEmail: false,
    },
    mode: "onChange",
  });

  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update profile. Please try again.");
    },
  });

  useEffect(() => {
    form.reset({
      userName: initialProfile.userName,
      email: initialProfile.email,
      role: initialProfile.role ?? "",
      company: initialProfile.company ?? "",
      location: initialProfile.location ?? "",
      bio: initialProfile.bio ?? "",
      githubUrl: initialProfile.githubUrl ?? "",
      websiteUrl: initialProfile.websiteUrl ?? "",
      dp: initialProfile.dp ?? "",
      isVerified: initialProfile.isVerified,
      isTopContributor: initialProfile.isTopContributor,
      receiveNotifications: initialProfile.receiveNotifications,
      showEmail: initialProfile.showEmail,
    });
  }, [form, initialProfile]);

  const onSubmit = async (data: UserProfileValues) => {
    updateProfile.mutate({ ...data, tags, dp: data.dp ?? "/placeholder.png" });
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Card className="border-t-4 border-t-primary shadow-sm">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading text-2xl">
              Edit Profile
            </CardTitle>
            <CardDescription className="font-text">
              Update your profile information and preferences
            </CardDescription>
          </div>

          {/* Display avatar in header without FormField */}
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage
                src={form.watch("dp") ?? "/placeholder.png"}
                alt="Profile"
              />
              <AvatarFallback>
                {form.watch("userName")?.substring(0, 2).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* DP Upload Field inside the Form */}
            <FormField
              control={form.control}
              name="dp"
              render={({ field }) => (
                <FormItem className="flex items-center justify-end gap-4">
                  <FormLabel className="font-heading text-sm font-medium">
                    Profile Picture:
                  </FormLabel>
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage
                        src={field.value ?? "/placeholder.png"}
                        alt="Profile"
                      />
                      <AvatarFallback>
                        {form
                          .watch("userName")
                          ?.substring(0, 2)
                          .toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="absolute bottom-0 right-0">
                      <div className="rounded-full bg-primary p-1 shadow-sm">
                        <UploadButton
                          endpoint="imageUploader"
                          appearance={{
                            button: "h-4 w-4 rounded-full p-0",
                            allowedContent: "hidden",
                          }}
                          content={{
                            button: (
                              <Camera className="mx-auto h-4 w-4 cursor-pointer text-white" />
                            ),
                          }}
                          onUploadBegin={() => {
                            // Added this handler
                            toast.loading("Uploading...", {
                              description: "Your image is being uploaded",
                            });
                            toast.dismiss();
                          }}
                          onClientUploadComplete={(res) => {
                            console.log(res);
                            field.onChange(res[0]?.appUrl);
                            toast.success("Image uploaded successfully", {
                              description:
                                "Your image has been uploaded successfully",
                            });
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`Upload failed: ${error.message}`);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <FormDescription className="font-text text-xs">
                    Click the camera icon to update your profile picture
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-medium">
                Profile Details
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your username"
                          {...field}
                          className="font-text"
                        />
                      </FormControl>
                      <FormDescription className="font-text text-xs">
                        This is your public display name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          className="font-text"
                        />
                      </FormControl>
                      <FormDescription className="font-text text-xs">
                        Your primary contact email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading">Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="font-text">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Frontend Developer">
                            Frontend Developer
                          </SelectItem>
                          <SelectItem value="Backend Developer">
                            Backend Developer
                          </SelectItem>
                          <SelectItem value="Full Stack Developer">
                            Full Stack Developer
                          </SelectItem>
                          <SelectItem value="DevOps Engineer">
                            DevOps Engineer
                          </SelectItem>
                          <SelectItem value="UI/UX Designer">
                            UI/UX Designer
                          </SelectItem>
                          <SelectItem value="Data Scientist">
                            Data Scientist
                          </SelectItem>
                          <SelectItem value="Product Manager">
                            Product Manager
                          </SelectItem>
                          <SelectItem value="QA Engineer">
                            QA Engineer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="font-text text-xs">
                        Your primary professional role
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading">Company</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Company name"
                          {...field}
                          className="font-text"
                        />
                      </FormControl>
                      <FormDescription className="font-text text-xs">
                        Where you currently work (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-heading">Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="City, Country"
                        {...field}
                        className="font-text"
                      />
                    </FormControl>
                    <FormDescription className="font-text text-xs">
                      Your general location (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-heading">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell the community about yourself..."
                        className="min-h-32 resize-y font-text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="font-text text-xs">
                      Brief description about yourself and your expertise
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* External Links */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-medium">
                External Links
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading">
                        GitHub Profile
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/yourusername"
                          {...field}
                          className="font-text"
                        />
                      </FormControl>
                      <FormDescription className="font-text text-xs">
                        Link to your GitHub profile
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-heading">
                        Personal Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com"
                          {...field}
                          className="font-text"
                        />
                      </FormControl>
                      <FormDescription className="font-text text-xs">
                        Link to your personal website or portfolio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Skills and Tags */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-medium">
                Skills & Areas of Expertise
              </h3>

              <div className="space-y-4">
                <div>
                  <FormLabel className="font-heading">Your Tags</FormLabel>
                  <FormDescription className="font-text text-xs">
                    Add tags representing your skills and areas of expertise
                  </FormDescription>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 px-2 py-1 font-text"
                      >
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(tag)}
                          className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))}

                    {tags.length === 0 && (
                      <div className="font-text text-sm text-muted-foreground">
                        No tags added yet. Add some tags to highlight your
                        skills.
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a skill or technology..."
                    className="font-text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <FormDescription className="font-text text-xs">
                  Press Enter or click the + button to add a tag
                </FormDescription>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-heading font-medium">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "javascript",
                    "react",
                    "typescript",
                    "node.js",
                    "python",
                    "aws",
                    "docker",
                    "kubernetes",
                    "css",
                    "html",
                    "graphql",
                    "mongodb",
                    "sql",
                    "devops",
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`cursor-pointer font-text transition-all hover:bg-secondary ${
                        tags.includes(tag) ? "bg-secondary" : ""
                      }`}
                      onClick={() => {
                        if (!tags.includes(tag)) {
                          setTags([...tags, tag]);
                        } else {
                          removeTag(tag);
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Settings and Privacy */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-medium">
                Profile Status
              </h3>

              <div className="rounded-lg border">
                <div className="space-y-6 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-heading text-base">
                        Verified Status
                      </h4>
                      <p className="font-text text-sm text-muted-foreground">
                        Users with verified status have a badge on their profile
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="isVerified"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-heading text-base">
                        Top Contributor Status
                      </h4>
                      <p className="font-text text-sm text-muted-foreground">
                        Top contributors are highlighted on the platform
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="isTopContributor"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <h3 className="mt-6 font-heading text-lg font-medium">
                Notifications & Privacy
              </h3>

              <div className="rounded-lg border">
                <div className="space-y-6 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-heading text-base">
                        Email Notifications
                      </h4>
                      <p className="font-text text-sm text-muted-foreground">
                        Receive email notifications about activity related to
                        you
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="receiveNotifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-heading text-base">
                        Show Email Publicly
                      </h4>
                      <p className="font-text text-sm text-muted-foreground">
                        Allow other users to see your email address
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="showEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
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
