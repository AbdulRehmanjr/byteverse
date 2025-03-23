"use client";
import { Button } from "~/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLogin } from "~/hooks/use-login";
import { api } from "~/trpc/react";

type MessageButtonProps = {
  userId: string;
  userName: string;
};
export const MessageButton = ({ userId, userName }: MessageButtonProps) => {
  const router = useRouter();
  const session = useSession();
  const { setIsLogin } = useLogin();
  const utils = api.useUtils();
  const initializeConversation =
    api.conversation.initializeConversation.useMutation({
      onSuccess: async (data) => {
        await utils.conversation.getConversations.refetch();
        router.push(`/chat?conversationId=${data.conversationId}`);
      },
    });

  const handleClick = () => {
    if (!session.data) {
      setIsLogin(true);
    } else {
      initializeConversation.mutate({
        senderId: session.data.user.id,
        receiverId: userId,
        senderName: userName,
      });
    }
  };

  if (userId === session.data?.user.id) return null;
  return (
    <Button type="button" variant="outline" size="sm" onClick={handleClick}>
      <MessageCircle className="mr-1 h-4 w-4" />
      Message
    </Button>
  );
};
