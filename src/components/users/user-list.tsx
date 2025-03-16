"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import {  Search, X, Filter, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { api } from "~/trpc/react";

export const UserList = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<{
    tag?: string;
    isVerified?: boolean;
    isTopContributor?: boolean;
    search?: string;
  }>({});
  const [searchInput, setSearchInput] = useState<string>("");

  // Fetch profiles with pagination
  const [data, { isFetching, error }] =
    api.profile.getAllProfiles.useSuspenseQuery({
      limit: 20,
      cursor,
      filter,
    });

  // Popular tags for filtering
  const popularTags = [
    "javascript",
    "react",
    "typescript",
    "next.js",
    "python",
    "aws",
    "node.js",
  ];

  const handleSearch = () => {
    setFilter((prev) => ({
      ...prev,
      search: searchInput,
    }));
    setCursor(undefined); // Reset pagination
  };

  const clearSearch = () => {
    setSearchInput("");
    setFilter((prev) => ({
      ...prev,
      search: undefined,
    }));
    setCursor(undefined); // Reset pagination
  };

  const handleTagFilter = (tag: string) => {
    setFilter((prev) => ({
      ...prev,
      tag,
    }));
    setCursor(undefined); // Reset pagination
  };

  const clearTagFilter = () => {
    setFilter((prev) => ({
      ...prev,
      tag: undefined,
    }));
    setCursor(undefined); // Reset pagination
  };

  const toggleVerifiedFilter = () => {
    setFilter((prev) => ({
      ...prev,
      isVerified: prev.isVerified === undefined ? true : undefined,
    }));
    setCursor(undefined); // Reset pagination
  };

  const toggleTopContributorFilter = () => {
    setFilter((prev) => ({
      ...prev,
      isTopContributor: prev.isTopContributor === undefined ? true : undefined,
    }));
    setCursor(undefined); // Reset pagination
  };

  const clearAllFilters = () => {
    setFilter({});
    setSearchInput("");
    setCursor(undefined);
  };

  const loadMore = () => {
    if (data?.nextCursor) {
      setCursor(data.nextCursor);
    }
  };

  const hasActiveFilters =
    filter.tag !== undefined ||
    filter.isVerified !== undefined ||
    filter.isTopContributor !== undefined ||
    filter.search !== undefined;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-950">
        <h2 className="mb-2 text-xl font-bold text-red-600 dark:text-red-400">
          Error Loading Profiles
        </h2>
        <p className="text-red-600 dark:text-red-400">{error.message}</p>
        <Button
          variant="outline"
          className="mt-4 border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  const profiles = data?.profiles ?? [];

  return (
    <div className="space-y-6">
      {/* Header and filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-heading text-3xl font-bold text-primary">
          Community
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search Box */}
          <div className="relative flex w-full md:w-64 lg:w-80">
            <Input
              placeholder="Search users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-r-none border-r-0 pr-16"
            />
            {searchInput && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-14 top-0 h-10 w-10 rounded-none border-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
            <Button
              type="button"
              className="h-10 rounded-l-none"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>

          {/* Combined Filters Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                <span>Filters</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "ml-2 px-1.5",
                    !hasActiveFilters && "opacity-0",
                  )}
                >
                  {Object.values(filter).filter(Boolean).length}
                </Badge>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Tags Filter */}
              <div className="p-2">
                <h3 className="mb-2 text-sm font-medium">Tags</h3>
                <div className="mb-2 flex flex-wrap gap-1">
                  {popularTags.slice(0, 5).map((tag) => (
                    <Badge
                      key={tag}
                      variant={filter.tag === tag ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        filter.tag === tag
                          ? clearTagFilter()
                          : handleTagFilter(tag)
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-full justify-start p-2"
                    >
                      <ChevronDown className="mr-1 h-3 w-3" />
                      <span className="text-xs">More tags</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {popularTags.slice(5).map((tag) => (
                      <DropdownMenuItem
                        key={tag}
                        onClick={() => handleTagFilter(tag)}
                      >
                        {tag}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <DropdownMenuSeparator />

              {/* User Status Filters */}
              <div className="space-y-2 p-2">
                <h3 className="mb-2 text-sm font-medium">User Status</h3>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="verified-filter-dropdown"
                    className="cursor-pointer text-sm"
                  >
                    Verified Users
                  </Label>
                  <Switch
                    id="verified-filter-dropdown"
                    checked={filter.isVerified !== undefined}
                    onCheckedChange={toggleVerifiedFilter}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="contributor-filter-dropdown"
                    className="cursor-pointer text-sm"
                  >
                    Top Contributors
                  </Label>
                  <Switch
                    id="contributor-filter-dropdown"
                    checked={filter.isTopContributor !== undefined}
                    onCheckedChange={toggleTopContributorFilter}
                  />
                </div>
              </div>

              <DropdownMenuSeparator />

              <div className="p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={clearAllFilters}
                  disabled={!hasActiveFilters}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear all filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap gap-2 rounded-lg bg-muted/50 p-3">
          <span className="text-sm font-medium">Active filters:</span>
          {filter.tag !== undefined && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              Tag: {filter.tag}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={clearTagFilter}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove tag filter</span>
              </Button>
            </Badge>
          )}
          {filter.isVerified !== undefined && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              Verified
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={toggleVerifiedFilter}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove verified filter</span>
              </Button>
            </Badge>
          )}
          {filter.isTopContributor !== undefined && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              Top Contributors
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={toggleTopContributorFilter}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove top contributor filter</span>
              </Button>
            </Badge>
          )}
          {filter.search !== undefined && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              Search: {filter.search}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={clearSearch}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove search filter</span>
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="ml-auto text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {profiles.length} {profiles.length === 1 ? "member" : "members"}
      </div>

      {profiles.length === 0 ? (
        <div className="my-20 flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 p-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">No profiles found</h3>
          <p className="mb-6 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={clearAllFilters}>
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <Card
            key={profile.profileId}
            className={cn(
              "h-full overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md",
              profile.isTopContributor && "border-l-4 border-l-amber-400"
            )}
          >
            <CardContent className="flex flex-col p-0">
              {/* User info section */}
              <div className="border-b p-4 h-[125px]">
                <div className="flex items-center gap-3 ">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={profile.dp ?? `https://avatar.vercel.sh/${profile.userName}.png`}
                      alt={profile.userName}
                    />
                    <AvatarFallback className="bg-gray-100">
                      {profile.userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{profile.userName}</h3>
                    <p className="text-xs text-gray-600">{profile.role ?? ""}</p>
                    <p className="text-xs text-gray-600">{profile.company ?? ""}</p>
                  </div>
                </div>
                
                {/* Badges row */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {profile.isVerified && (
                    <Badge className="rounded-md bg-red-50 text-red-600 hover:bg-red-100 border-red-200 px-2 py-1 text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                  {profile.isTopContributor && (
                    <Badge className="rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200 px-2 py-1 text-xs">
                      ⭐ Top Contributor
                    </Badge>
                  )}
                </div>
              </div>
          
              {/* Tags section with border */}
              <div className="border-b p-4">
                <div className="flex flex-wrap gap-1.5">
                  {(profile.tags ?? []).slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      className="rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 px-2 py-1 text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {(profile.tags ?? []).length > 3 && (
                    <Badge className="rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 px-2 py-1 text-xs">
                      +{profile.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
          
              {/* Stats section */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  <span className="text-sm text-gray-700">{profile.reputation ?? 0}</span>
                </div>
                
                <div className="text-xs text-gray-600">
                  {profile.location}
                </div>
              </div>
          
              {/* Action button */}
              <div className="p-3">
                <Button 
                  className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white" 
                  asChild
                >
                  <Link href={`/users/${profile.userId}`}>
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      {/* Load more button */}
      {data?.nextCursor && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={loadMore}
            disabled={isFetching}
            variant="outline"
            className="min-w-[200px]"
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};
