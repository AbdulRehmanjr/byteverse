"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  Clock,
  Tag,
  Loader2,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { PostSkeletons } from "../skeletons/post-list";
import { CommentsSection } from "./post-comment";

// Configure dayjs
dayjs.extend(relativeTime);

// Define types for posts and related data
interface User {
  userId: string;
  userName: string | null;
}

interface Post {
  postId: string;
  userId: string;
  content: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  hashTags: string[];
  user: User;
  _count?: {
    likes?: number;
    comments?: number;
  };
}

interface PostLike {
  id: string;
  postId: string;
  userId: string;
}

export const PostList: React.FC = () => {
  const session = useSession();
  const [hasMore, setHasMore] = useState(true);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const limit = 5;

  // Create a ref for the intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Query for posts with infinite scrolling
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = api.post.getInfinitePosts.useInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: true, // Enable for all users to see posts
    },
  );

  const likedByMe = api.post.getLikedPostsByMe.useQuery(undefined, {
    enabled: !!session.data,
  });

  // Flatten the pages into a single array of posts
  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0]?.isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            void fetchNextPage();
          }
        },
        { threshold: 0.5 },
      );

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Update hasMore state based on hasNextPage
  useEffect(() => {
    setHasMore(!!hasNextPage);
  }, [hasNextPage]);

  // TRPC utils for invalidating queries
  const utils = api.useUtils();

  // Handle comment input change
  const handleCommentInputChange = (postId: string, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  // Add comment mutation
  const addCommentMutation = api.post.addComment.useMutation({
    onSuccess: (_, variables) => {
      // Clear input
      setCommentInputs((prev) => ({
        ...prev,
        [variables.postId]: "",
      }));

      // Invalidate queries to refresh data
      void utils.post.getInfinitePosts.invalidate();
      void utils.post.getCommentsByPostId.invalidate({postId: variables.postId});
      toast.success("Comment added successfully");
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });

  // Handle comment submission
  const handleSubmitComment = (postId: string) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    if (!session.data) {
      toast.error("Please sign in to comment");
      return;
    }

    addCommentMutation.mutate({
      postId,
      content,
    });
  };

  // Like post mutation
  const likeMutation = api.post.likePost.useMutation({
    onSuccess: () => {
      // Invalidate queries to refresh data
      void utils.post.getLikedPostsByMe.invalidate();
      void utils.post.getInfinitePosts.invalidate();
    },
    onError: () => {
      toast.error("Failed to like post");
    },
  });

  // Handle like functionality
  const handleLike = (postId: string) => {
    if (!session.data) {
      toast.error("Please sign in to like posts");
      return;
    }

    likeMutation.mutate({ postId });
  };

  if (isError) {
    return (
      <div className="my-8 text-center">
        <p className="text-lg text-red-500">Error loading posts</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Create post button */}
      <div className="sticky top-0 z-10 mb-8 bg-background py-4">
        <Button asChild>
          <Link href="/posts/create">Create New Post</Link>
        </Button>
      </div>

      {/* Posts with comments section */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <PostSkeletons count={1} />
                {/* Comment skeleton */}
                <Card className="overflow-hidden border bg-card shadow-sm">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="h-6 w-24 rounded bg-muted"></div>
                    <div className="h-6 w-16 rounded-full bg-muted"></div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="flex animate-pulse flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-muted"></div>
                            <div className="h-3 w-32 rounded bg-muted"></div>
                          </div>
                          <div className="h-10 w-full rounded bg-muted"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <>
            {posts.map((post: Post) => (
              <div key={post.postId} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Post Card */}
                <Card className="overflow-hidden">
                  {/* Post header */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border ring-2 ring-primary/10">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${post.postId}.png`}
                        />
                        <AvatarFallback>
                          {post.user.userName?.substring(0, 2).toUpperCase() ??
                            "UN"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <Link
                          href={`/profile/${post.user.userId}`}
                          className="font-semibold hover:underline"
                        >
                          {post.user.userName ?? "Anonymous"}
                        </Link>
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {dayjs(post.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full hover:bg-accent"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/posts/${post.postId}`,
                            );
                            toast.success("Link copied to clipboard");
                          }}
                        >
                          Copy link
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (navigator.share) {
                              navigator
                                .share({
                                  title: "Check out this post",
                                  url: `${window.location.origin}/posts/${post.postId}`,
                                })
                                .catch((error) =>
                                  console.error("Error sharing:", error),
                                );
                            } else {
                              navigator.clipboard.writeText(
                                `${window.location.origin}/posts/${post.postId}`,
                              );
                              toast.success("Link copied to clipboard");
                            }
                          }}
                        >
                          Share post
                        </DropdownMenuItem>
                        <DropdownMenuItem>Report post</DropdownMenuItem>
                        {session.data?.user.id === post.userId && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/posts/edit/${post.postId}`}>
                                Edit post
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              Delete post
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Post content - before image */}
                  <div className="px-4 pb-3">
                    <p className="text-base">{post.content}</p>

                    {post.hashTags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {post.hashTags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post image */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={
                        post.image && post.image.trim() !== ""
                          ? post.image
                          : "/placeholder.png"
                      }
                      alt="Post image"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 768px"
                      priority={true}
                    />
                  </div>

                  {/* Post actions */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-10 w-10 rounded-full",
                          likedByMe.data?.some(
                            (like: PostLike) => like.postId === post.postId,
                          )
                            ? "text-red-500"
                            : "",
                        )}
                        onClick={() => handleLike(post.postId)}
                      >
                        <Heart
                          className={cn(
                            "h-6 w-6",
                            likedByMe.data?.some(
                              (like: PostLike) => like.postId === post.postId,
                            )
                              ? "fill-red-500"
                              : "",
                          )}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={() => {
                          const commentInput = document.getElementById(
                            `comment-input-${post.postId}`,
                          );
                          if (commentInput) {
                            commentInput.focus();
                          }
                        }}
                      >
                        <MessageCircle className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={() => {
                          if (navigator.share) {
                            navigator
                              .share({
                                title: "Check out this post",
                                url: `${window.location.origin}/posts/${post.postId}`,
                              })
                              .catch((error) =>
                                console.error("Error sharing:", error),
                              );
                          } else {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/posts/${post.postId}`,
                            );
                            toast.success("Link copied to clipboard");
                          }
                        }}
                      >
                        <Share2 className="h-6 w-6" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                    >
                      <Bookmark className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Post stats and content */}
                  <CardContent className="px-4 py-0">
                    <div className="mb-2">
                      <span className="font-semibold">
                        {post._count?.likes ?? 0} likes
                      </span>
                    </div>
                  </CardContent>

                  {/* Add comment */}
                  <CardFooter className="border-t p-4">
                    <div className="flex w-full items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            session.data?.user.image ??
                            `https://avatar.vercel.sh/user.png`
                          }
                        />
                        <AvatarFallback>
                          {session.data?.user.name
                            ?.substring(0, 2)
                            .toUpperCase() ?? "UN"}
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        id={`comment-input-${post.postId}`}
                        placeholder="Add a comment..."
                        className="flex-1 rounded-full border-0 bg-accent/30 focus-visible:ring-1 focus-visible:ring-ring"
                        value={commentInputs[post.postId] ?? ""}
                        onChange={(e) =>
                          handleCommentInputChange(post.postId, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmitComment(post.postId);
                          }
                        }}
                      />
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        variant="ghost"
                        onClick={() => handleSubmitComment(post.postId)}
                        disabled={
                          !commentInputs[post.postId]?.trim() ??
                          addCommentMutation.isPending
                        }
                      >
                        {addCommentMutation.isPending ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Send className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* Comments Section */}
                <CommentsSection postId={post.postId} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Loading indicator for infinite scrolling */}
      <div ref={loadMoreRef} className="py-6">
        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
      </div>

      {/* Show message when no more posts */}
      {!hasMore && posts.length > 0 && (
        <div className="py-8 text-center text-muted-foreground">
          <p>You&apos;ve reached the end</p>
        </div>
      )}

      {/* Show message when no posts */}
      {!isLoading && posts.length === 0 && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-2xl font-medium">No posts yet</h3>
          <p className="mx-auto mb-6 max-w-sm text-muted-foreground">
            Be the first to share something with the community!
          </p>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-6 text-lg text-white hover:from-blue-600 hover:to-purple-600"
            asChild
          >
            <Link href="/posts/create">Create First Post</Link>
          </Button>
        </div>
      )}
    </>
  );
};