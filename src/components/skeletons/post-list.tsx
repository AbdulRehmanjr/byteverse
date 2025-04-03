import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export const PostSkeletons = ({ count = 3 }: { count?: number }) => {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <Card
            key={i}
            className="overflow-hidden border-l-4 border-l-primary/20"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 animate-pulse rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-4 h-32 w-full rounded-md" />
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3">
              <div className="flex w-full justify-between">
                <Skeleton className="h-6 w-20" />
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };
  