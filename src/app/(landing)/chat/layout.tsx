import { Suspense } from "react";
import { SidebarSkeleton } from "~/components/skeletons/chat-sidebar";
import { ChatSidebar } from "~/components/chat/chat-sidebar";

export default function MessagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-3">
        <Suspense fallback={<SidebarSkeleton />}>
          <ChatSidebar />
        </Suspense>
      </div>
      <div className="col-span-9">
      {/* <Suspense fallback={<MessageAreaSkeleton />}>
        {children}
      </Suspense> */}
      {children}
      </div>
    </div>
  );
}