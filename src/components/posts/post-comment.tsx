// CommentsSection.tsx
import { useState } from "react";
import { api } from "~/trpc/react";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { MessageCircle, Loader2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Configure dayjs
dayjs.extend(relativeTime);

// Define types for comments
interface User {
  userId: string;
  userName: string | null;
}

interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  user?: User;
}

// Props for the CommentItem component
interface CommentItemProps {
  comment: Comment;
}

// Comment component
const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="mb-4 rounded-lg bg-accent/20 p-3">
      <div className="mb-2 flex items-center gap-2">
        <Avatar className="h-7 w-7 border">
          <AvatarImage src={`https://avatar.vercel.sh/${comment.userId}.png`} />
          <AvatarFallback>
            {comment.user?.userName?.substring(0, 2).toUpperCase() ?? "UN"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">
            {comment.user?.userName ?? "Anonymous"}
          </p>
          <p className="text-xs text-muted-foreground">
            {dayjs(comment.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <p className="text-sm">{comment.content}</p>
    </div>
  );
};

// Props for the CommentsSection component
interface CommentsSectionProps {
  postId: string;
}

// Comments section component
export const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  // Get comments for this post
  const { data: comments, isLoading: commentsLoading } =
    api.post.getCommentsByPostId.useQuery({ postId });

  return (
    <Card className="h-full max-h-screen overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-medium">Comments</h3>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
          {comments?.items.length || 0} comments
        </span>
      </div>

      <ScrollArea className="h-[calc(100%-64px)]">
        <div className="p-4">
          {commentsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex animate-pulse flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-muted"></div>
                    <div className="h-3 w-32 rounded bg-muted"></div>
                  </div>
                  <div className="h-10 w-full rounded bg-muted"></div>
                </div>
              ))}
            </div>
          ) : comments?.items.length ? (
            <div className="space-y-2">
              {comments.items.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageCircle className="mb-2 h-12 w-12 text-muted-foreground/50" />
              <h4 className="text-lg font-medium">No comments yet</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Be the first to comment on this post
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
