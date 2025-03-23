
import { Skeleton } from "~/components/ui/skeleton";

    
export const SidebarSkeleton = () => (
  <div className="border-r bg-muted/10 h-screen">
    <div className="p-4 border-b">
      <h2 className="text-xl font-semibold">Messages</h2>
    </div>
    <div className="p-2 space-y-2">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);