"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { MessageSquare } from "lucide-react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const ChatSidebar = () => {
  const router = useRouter();
  const session = useSession();

  const [conversations] = api.conversation.getConversations.useSuspenseQuery();

  const handleSelectConversation = (conversationId: string) => {
    router.push(`/chat?conversationId=${conversationId}`);
  };

  return (
    <div className="h-[80vh] border-r bg-muted/10">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-2 p-2">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No conversations yet
            </div>
          ) : (
            conversations.map((conversation) => {
              const lastMessage = conversation.lastMessage ?? "No messages yet";

              return (
                <Button
                  key={conversation.conversationId}
                  variant="ghost"
                  className="w-full justify-start space-x-3"
                  onClick={() =>
                    handleSelectConversation(conversation.conversationId)
                  }
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">
                      {session.data?.user.id === conversation.senderId
                        ? conversation.receiver.userName
                        : conversation.sender.userName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {lastMessage}
                    </p>
                  </div>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </Button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
