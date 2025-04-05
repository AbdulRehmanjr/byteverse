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
  Code,
  Copy,
  Search,
  X,
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
import { toast } from "sonner";
import { SnippetCommentsSection } from "./comment-section";
import { debounce } from "lodash";

// Configure dayjs
dayjs.extend(relativeTime);

// Define types for snippets and related data
interface User {
  userId: string;
  userName: string | null;
}

interface CodeSnippet {
  snippetId: string;
  userId: string;
  title: string;
  description: string | null;
  code: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  user: User;
  _count?: {
    likes?: number;
    comments?: number;
  };
}

interface SnippetLike {
  id: string;
  snippetId: string;
  userId: string;
}

export const SnippetList: React.FC = () => {
  const session = useSession();
  const [hasMore, setHasMore] = useState(true);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const limit = 5;

  // Create a ref for the intersection observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounce search input to prevent excessive API calls
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    handler();
    return () => {
      handler.cancel();
    };
  }, [searchQuery]);

  // Query for snippets with infinite scrolling and search
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = api.snippet.getInfiniteSnippets.useInfiniteQuery(
    { 
      limit,
      searchQuery: debouncedSearchQuery 
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: true, // Enable for all users to see snippets
    },
  );

  // Refetch when search query changes
  useEffect(() => {
    setIsSearching(true);
    void refetch().then(() => {
      setIsSearching(false);
    });
  }, [debouncedSearchQuery, refetch]);

  const likedByMe = api.snippet.getLikedSnippetsByMe.useQuery(undefined, {
    enabled: !!session.data,
  });

  // Flatten the pages into a single array of snippets
  const snippets = data?.pages.flatMap((page) => page.items) ?? [];

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
  const handleCommentInputChange = (snippetId: string, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [snippetId]: value,
    }));
  };

  // Add comment mutation
  const addCommentMutation = api.snippet.addComment.useMutation({
    onSuccess: (_, variables) => {
      // Clear input
      setCommentInputs((prev) => ({
        ...prev,
        [variables.snippetId]: "",
      }));

      // Invalidate queries to refresh data
      void utils.snippet.getInfiniteSnippets.invalidate();
      void utils.snippet.getCommentsBySnippetId.invalidate({snippetId: variables.snippetId});
      toast.success("Comment added successfully");
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });

  // Handle comment submission
  const handleSubmitComment = (snippetId: string) => {
    const content = commentInputs[snippetId]?.trim();
    if (!content) return;

    if (!session.data) {
      toast.error("Please sign in to comment");
      return;
    }

    addCommentMutation.mutate({
      snippetId,
      content,
    });
  };

  // Like snippet mutation
  const likeMutation = api.snippet.likeSnippet.useMutation({
    onSuccess: () => {
      // Invalidate queries to refresh data
      void utils.snippet.getLikedSnippetsByMe.invalidate();
      void utils.snippet.getInfiniteSnippets.invalidate();
    },
    onError: () => {
      toast.error("Failed to like snippet");
    },
  });

  // Handle like functionality
  const handleLike = (snippetId: string) => {
    if (!session.data) {
      toast.error("Please sign in to like snippets");
      return;
    }

    likeMutation.mutate({ snippetId });
  };

  // Function to copy code to clipboard
  const copyCodeToClipboard = (code: string) => {
    void navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  if (isError) {
    return (
      <div className="my-8 text-center">
        <p className="text-lg text-red-500">Error loading code snippets</p>
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
      {/* Header with Create and Search */}
      <div className="sticky top-0 z-10 mb-8 bg-background py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild>
            <Link href="/snippets/create">Create New Snippet</Link>
          </Button>
          
          {/* Search input */}
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search snippets by title, code or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full p-0"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Search filters display */}
        {debouncedSearchQuery && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Searching for: <strong>{debouncedSearchQuery}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 rounded-full px-2 py-0"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Loading state for search */}
      {isSearching && !isLoading && (
        <div className="mb-8 flex items-center justify-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Searching snippets...</span>
        </div>
      )}

      {/* Snippets with comments section */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="animate-pulse overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted"></div>
                      <div className="flex flex-col space-y-2">
                        <div className="h-4 w-24 rounded bg-muted"></div>
                        <div className="h-3 w-16 rounded bg-muted"></div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-3">
                    <div className="h-6 w-3/4 rounded bg-muted"></div>
                    <div className="mt-2 h-4 w-1/2 rounded bg-muted"></div>
                  </div>
                  <div className="relative h-48 w-full bg-muted"></div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-muted"></div>
                      <div className="h-4 w-full rounded bg-muted"></div>
                    </div>
                  </div>
                </Card>
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
            {snippets.length > 0 ? (
              snippets.map((snippet: CodeSnippet) => (
                <div key={snippet.snippetId} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Snippet Card */}
                  <Card className="overflow-hidden">
                    {/* Snippet header */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border ring-2 ring-primary/10">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${snippet.snippetId}.png`}
                          />
                          <AvatarFallback>
                            {snippet.user.userName?.substring(0, 2).toUpperCase() ??
                              "UN"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Link
                            href={`/profile/${snippet.user.userId}`}
                            className="font-semibold hover:underline"
                          >
                            {snippet.user.userName ?? "Anonymous"}
                          </Link>
                          <span className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {dayjs(snippet.createdAt).fromNow()}
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
                              void navigator.clipboard.writeText(
                                `${window.location.origin}/snippets/${snippet.snippetId}`,
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
                                    title: snippet.title,
                                    url: `${window.location.origin}/snippets/${snippet.snippetId}`,
                                  })
                                  .catch((error) =>
                                    console.error("Error sharing:", error),
                                  );
                              } else {
                                void navigator.clipboard.writeText(
                                  `${window.location.origin}/snippets/${snippet.snippetId}`,
                                );
                                toast.success("Link copied to clipboard");
                              }
                            }}
                          >
                            Share snippet
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => copyCodeToClipboard(snippet.code)}>
                            Copy code
                          </DropdownMenuItem>
                          <DropdownMenuItem>Report snippet</DropdownMenuItem>
                          {session.data?.user.id === snippet.userId && (
                            <>
                              <DropdownMenuItem asChild>
                                <Link href={`/snippets/edit/${snippet.snippetId}`}>
                                  Edit snippet
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Delete snippet
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Snippet title and description */}
                    <div className="px-4 pb-3">
                      <h3 className="text-xl font-semibold">{snippet.title}</h3>
                      {snippet.description && (
                        <p className="mt-1 text-muted-foreground">{snippet.description}</p>
                      )}

                      {snippet.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {snippet.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex cursor-pointer items-center bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                              onClick={() => setSearchQuery(tag)}
                            >
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Badge 
                        className="mt-2 cursor-pointer bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        onClick={() => setSearchQuery(snippet.language)}
                      >
                        {snippet.language}
                      </Badge>
                    </div>

                    {/* Code snippet */}
                    <div className="relative overflow-hidden bg-black p-4">
                      <pre className="max-h-[300px] overflow-auto rounded bg-gray-900 p-4 text-white">
                        <code className="font-mono text-sm">{snippet.code}</code>
                      </pre>
                      <div className="absolute right-4 top-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="text-xs"
                          onClick={() => copyCodeToClipboard(snippet.code)}
                        >
                          <Copy className="mr-1 h-3 w-3" />
                          Copy
                        </Button>
                      </div>
                    </div>

                    {/* Snippet actions */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-10 w-10 rounded-full",
                            likedByMe.data?.some(
                              (like: SnippetLike) => like.snippetId === snippet.snippetId,
                            )
                              ? "text-red-500"
                              : "",
                          )}
                          onClick={() => handleLike(snippet.snippetId)}
                        >
                          <Heart
                            className={cn(
                              "h-6 w-6",
                              likedByMe.data?.some(
                                (like: SnippetLike) => like.snippetId === snippet.snippetId,
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
                              `comment-input-${snippet.snippetId}`,
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
                                  title: snippet.title,
                                  url: `${window.location.origin}/snippets/${snippet.snippetId}`,
                                })
                                .catch((error) =>
                                  console.error("Error sharing:", error),
                                );
                            } else {
                              void navigator.clipboard.writeText(
                                `${window.location.origin}/snippets/${snippet.snippetId}`,
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

                    {/* Snippet stats */}
                    <CardContent className="px-4 py-0">
                      <div className="mb-2">
                        <span className="font-semibold">
                          {snippet._count?.likes ?? 0} likes
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
                          id={`comment-input-${snippet.snippetId}`}
                          placeholder="Add a comment..."
                          className="flex-1 rounded-full border-0 bg-accent/30 focus-visible:ring-1 focus-visible:ring-ring"
                          value={commentInputs[snippet.snippetId] ?? ""}
                          onChange={(e) =>
                            handleCommentInputChange(snippet.snippetId, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmitComment(snippet.snippetId);
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          className="h-10 w-10 rounded-full"
                          variant="ghost"
                          onClick={() => handleSubmitComment(snippet.snippetId)}
                          disabled={
                          commentInputs[snippet.snippetId]?.trim() ||
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
                  <SnippetCommentsSection snippetId={snippet.snippetId} />
                </div>
              ))
            ) : (
              // No snippets with current search query
              <div className="py-16 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  {debouncedSearchQuery ? (
                    <Search className="h-10 w-10 text-muted-foreground" />
                  ) : (
                    <Code className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <h3 className="mb-2 text-2xl font-medium">
                  {debouncedSearchQuery
                    ? `No snippets found for "${debouncedSearchQuery}"`
                    : "No code snippets yet"}
                </h3>
                <p className="mx-auto mb-6 max-w-sm text-muted-foreground">
                  {debouncedSearchQuery
                    ? "Try a different search term or clear the search"
                    : "Be the first to share a code snippet with the community!"}
                </p>
                {debouncedSearchQuery ? (
                  <Button
                    className="px-8 py-6 text-lg"
                    variant="outline"
                    onClick={handleClearSearch}
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-6 text-lg text-white hover:from-blue-600 hover:to-purple-600"
                    asChild
                  >
                    <Link href="/snippets/create">Create First Snippet</Link>
                  </Button>
                )}
              </div>
            )}
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

      {/* Show message when no more snippets */}
      {!hasMore && snippets.length > 0 && (
        <div className="py-8 text-center text-muted-foreground">
          <p>You&apos;ve reached the end</p>
        </div>
      )}
    </>
  );
};