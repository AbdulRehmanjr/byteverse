"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { getClientPusher } from "~/lib/pusher-client";
import { api } from "~/trpc/react";
import { messageEncryption } from "~/utils/encryption";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type Message = {
  messageId: string;
  content: string;
  senderId: string;
  createdAt: Date;
  read: boolean;
  status?: "sending" | "sent" | "error";
};

type MessageFormData = {
  message: string;
};

export const ChatBox = () => {
  const session = useSession();
  const currentUserId = session?.data?.user.id;

  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, watch, setFocus } =
    useForm<MessageFormData>({
      defaultValues: {
        message: "",
      },
    });

  const messageContent = watch("message");
  const markRead = api.message.markAsRead.useMutation();

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    requestAnimationFrame(() => {
      const scrollElement = scrollAreaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      scrollElement?.scrollTo({
        top: scrollElement.scrollHeight,
        behavior,
      });
    });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  // Create Pusher client only once
  const pusherClient = useMemo(() => {
    try {
      console.log("pusher creation");
      return getClientPusher();
    } catch (error) {
      console.error("Failed to create Pusher client:", error);
      setError("Failed to initialize chat");
      return null;
    }
  }, []);

  // Create channel subscription only when conversationId changes
  const channel = useMemo(() => {
    if (!pusherClient || !conversationId) return null;

    try {
      console.log("channel creation");
      return pusherClient.subscribe(`private-conversation-${conversationId}`);
    } catch (error) {
      console.error("Failed to subscribe to channel:", error);
      setError("Failed to initialize chat");
      return null;
    }
  }, [pusherClient, conversationId]);

  // Set up message listener and handle cleanup in a single effect
  useEffect(() => {
    if (!channel || !currentUserId) return;

    const handleNewMessage = async (data: {
      messageId: string;
      message: string;
      senderId: string;
      timestamp: number;
    }) => {
      try {
        
     
        if (data.senderId !== currentUserId) {
            const decryptedContent = messageEncryption.decrypt(data.message);
            const newMessage: Message = {
              messageId: data.messageId,
              content: decryptedContent,
              senderId: data.senderId,
              createdAt: new Date(data.timestamp),
              read: false,
              status: "sent",
            };
            setMessages((prev) => [...prev, newMessage]);
          markRead.mutate({ conversationId: conversationId ?? "" });
        }
      } catch (error) {
        console.error("Error processing incoming message:", error);
      }
    };
    channel.bind("new-message", handleNewMessage);

    // Single cleanup function for both event binding and channel subscription
    return () => {
      channel.unbind("new-message", handleNewMessage);
      pusherClient?.unsubscribe(`private-conversation-${conversationId}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, pusherClient, conversationId, currentUserId]);

  const { data: fetchedMessages } = api.message.getMessages.useQuery(
    {
      conversationId: conversationId ?? "",
      limit: 50,
    },
    {
      enabled: !!conversationId,
      refetchOnWindowFocus: false,
    },
  );

  const { data: conversationData } = api.conversation.getConversation.useQuery(
    { conversationId: conversationId ?? "" },
    {
      enabled: !!conversationId,
    },
  );

  useEffect(() => {
    if (fetchedMessages?.messages) {
      setMessages(
        fetchedMessages.messages.map((msg) => ({ ...msg, status: "sent" })),
      );
      scrollToBottom("auto");
    }
  }, [fetchedMessages, scrollToBottom]);

  const sendMessageMutation = api.message.sendMessage.useMutation({
    onSuccess: () => {
      reset();
    },
    onError: (error) => {
      setError("Failed to send message");
      console.error("Send message error:", error);
    },
  });

  const onSubmit = async (data: MessageFormData) => {
    if (!data.message.trim() || sendMessageMutation.isPending || !currentUserId)
      return;

    const messageText = data.message;
    const temporaryId = `temp-${Date.now()}`;

    try {
      const optimisticMessage: Message = {
        messageId: temporaryId,
        content: messageText,
        senderId: currentUserId,
        createdAt: new Date(),
        read: false,
        status: "sending",
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      reset();

      const encryptedMessage = messageEncryption.encrypt(messageText);
      const result = await sendMessageMutation.mutateAsync({
        conversationId: conversationId ?? "",
        content: encryptedMessage,
        senderId: currentUserId,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === temporaryId
            ? { ...msg, messageId: result.messageId, status: "sent" }
            : msg,
        ),
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === temporaryId ? { ...msg, status: "error" } : msg,
        ),
      );
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-[80vh] w-full flex-col bg-white">
      <div className="border-b px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {conversationData?.sender.userName ?? "Chat"}
        </h3>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 py-4">
        <div className="flex min-h-full flex-col justify-end space-y-4">
          {messages.map((message) => (
            <div
              key={message.messageId}
              className={`flex ${
                message.senderId === currentUserId
                  ? "justify-end"
                  : "justify-start"
              } space-x-2`}
            >
              <div
                className={`group relative max-w-[80%] ${
                  message.senderId === currentUserId ? "ml-4" : "mr-4"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.senderId === currentUserId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  } ${message.status === "sending" ? "opacity-70" : ""}`}
                >
                  <p className="break-words text-sm">{message.content}</p>
                </div>

                <div
                  className={`mt-1 flex items-center space-x-2 text-xs ${
                    message.senderId === currentUserId
                      ? "justify-end text-gray-500"
                      : "justify-start text-gray-500"
                  }`}
                >
                  <span>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.status === "sending" && (
                    <span className="text-blue-500">Sending...</span>
                  )}
                  {message.status === "error" && (
                    <span className="text-red-500">Failed to send</span>
                  )}
                  {message.read && message.status === "sent" && <span>✓✓</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t px-6 py-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center space-x-2"
        >
          <Input
            {...register("message")}
            placeholder="Type a message..."
            className="flex-1"
            autoFocus
            onBlur={() => setFocus("message")}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!messageContent?.trim()}
            className="h-10 w-10 rounded-full"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
};
