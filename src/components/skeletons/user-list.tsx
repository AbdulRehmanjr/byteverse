import { Card,CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";



export const UserListSkeleton = () => {
    return (
      <div className="space-y-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-primary">Community</h1>
          <div className="flex-1 md:max-w-md">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="mb-1 h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
                <div className="mb-3 flex gap-1">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="mt-3 flex justify-end">
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

