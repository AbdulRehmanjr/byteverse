"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Search,
  Filter,
  Code,
  Star,
  Award,
  SortAsc,
  Loader2,
  Hash,
  BadgeCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { cn } from "~/lib/utils";

// Dummy data for users - this would come from your API in a real app
const DUMMY_USERS = [
  {
    userId: "user1",
    userName: "sarahcoder",
    reputation: 12453,
    tags: ["javascript", "react", "next.js", "typescript"],
    role: "Frontend Developer",
    company: "TechCorp",
    isVerified: true,
    topContributor: true,
    questionCount: 35,
    answerCount: 89,
  },
  {
    userId: "user2",
    userName: "alexdev",
    reputation: 8732,
    tags: ["python", "django", "fastapi", "machine-learning"],
    role: "Backend Engineer",
    company: "DataSystems Inc",
    isVerified: true,
    topContributor: false,
    questionCount: 18,
    answerCount: 143,
  },
  {
    userId: "user3",
    userName: "techguru",
    reputation: 23547,
    tags: ["devops", "aws", "kubernetes", "docker"],
    role: "DevOps Architect",
    company: "CloudScale",
    isVerified: true,
    topContributor: true,
    questionCount: 42,
    answerCount: 276,
  },
  {
    userId: "user4",
    userName: "datawhiz",
    reputation: 6821,
    tags: ["data-science", "python", "r", "statistics"],
    role: "Data Scientist",
    company: "AI Solutions",
    isVerified: false,
    topContributor: false,
    questionCount: 24,
    answerCount: 78,
  },
  {
    userId: "user5",
    userName: "cppmaster",
    reputation: 18543,
    tags: ["c++", "algorithms", "data-structures", "game-development"],
    role: "Systems Programmer",
    company: "GameWorks",
    isVerified: true,
    topContributor: true,
    questionCount: 56,
    answerCount: 213,
  },
  {
    userId: "user6",
    userName: "webwizard",
    reputation: 9274,
    tags: ["html", "css", "javascript", "web-design"],
    role: "UI/UX Designer",
    company: "Creative Digital",
    isVerified: false,
    topContributor: false,
    questionCount: 31,
    answerCount: 112,
  },
  {
    userId: "user7",
    userName: "securitypro",
    reputation: 15321,
    tags: ["security", "penetration-testing", "cryptography", "networking"],
    role: "Security Specialist",
    company: "SecureNet",
    isVerified: true,
    topContributor: true,
    questionCount: 38,
    answerCount: 194,
  },
  {
    userId: "user8",
    userName: "mobiledev",
    reputation: 7843,
    tags: ["android", "kotlin", "ios", "flutter"],
    role: "Mobile Developer",
    company: "AppSphere",
    isVerified: true,
    topContributor: false,
    questionCount: 27,
    answerCount: 86,
  },
  {
    userId: "user9",
    userName: "dbwizard",
    reputation: 11287,
    tags: ["sql", "postgresql", "mongodb", "database-design"],
    role: "Database Administrator",
    company: "DataCore",
    isVerified: true,
    topContributor: false,
    questionCount: 45,
    answerCount: 132,
  },
  {
    userId: "user10",
    userName: "uiexpert",
    reputation: 9852,
    tags: ["ui-design", "figma", "react", "tailwind"],
    role: "UI Designer",
    company: "DesignHub",
    isVerified: false,
    topContributor: false,
    questionCount: 29,
    answerCount: 64,
  },
  {
    userId: "user11",
    userName: "cloudguru",
    reputation: 14762,
    tags: ["aws", "azure", "google-cloud", "serverless"],
    role: "Cloud Architect",
    company: "CloudNative",
    isVerified: true,
    topContributor: true,
    questionCount: 37,
    answerCount: 156,
  },
  {
    userId: "user12",
    userName: "blockchainder",
    reputation: 8975,
    tags: ["blockchain", "ethereum", "smart-contracts", "web3"],
    role: "Blockchain Developer",
    company: "ChainTech",
    isVerified: true,
    topContributor: false,
    questionCount: 22,
    answerCount: 67,
  },
];

export default function UserListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("reputation");
  const [filterTag, setFilterTag] = useState("");
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterTopContributor, setFilterTopContributor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Number of users per page
  const usersPerPage = 8;

  // Get all tags for the filter dropdown
  const allTags = Array.from(
    new Set(DUMMY_USERS.flatMap((user) => user.tags)),
  ).sort();

  // Filter and sort users based on current criteria
  const filteredUsers = DUMMY_USERS.filter((user) => {
    // Search filter
    const matchesSearch =
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase());

    // Tag filter
    const matchesTag = !filterTag || user.tags.includes(filterTag);

    // Verified filter
    const matchesVerified = !filterVerified || user.isVerified;

    // Top contributor filter
    const matchesTopContributor = !filterTopContributor || user.topContributor;

    return (
      matchesSearch && matchesTag && matchesVerified && matchesTopContributor
    );
  }).sort((a, b) => {
    // Sort based on selected criteria
    if (sortOption === "reputation") {
      return b.reputation - a.reputation;
    } else if (sortOption === "answers") {
      return b.answerCount - a.answerCount;
    } else if (sortOption === "questions") {
      return b.questionCount - a.questionCount;
    } else if (sortOption === "username") {
      return a.userName.localeCompare(b.userName);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setIsLoading(true);

      // Simulate loading for better UX
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setFilterTag("");
    setFilterVerified(false);
    setFilterTopContributor(false);
    setSortOption("reputation");
    setCurrentPage(1);
  };

  return (
    <section className="mx-6 grid gap-2 p-  3">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Developer Community</h1>
        <p className="mt-2 text-muted-foreground">
          Connect with developers, ask questions, and share knowledge
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by username, role, or company..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <SortAsc className="h-4 w-4" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setSortOption("reputation")}
                  className={sortOption === "reputation" ? "bg-muted" : ""}
                >
                  By Reputation
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("answers")}
                  className={sortOption === "answers" ? "bg-muted" : ""}
                >
                  By Answer Count
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("questions")}
                  className={sortOption === "questions" ? "bg-muted" : ""}
                >
                  By Question Count
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOption("username")}
                  className={sortOption === "username" ? "bg-muted" : ""}
                >
                  By Username (A-Z)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Code className="h-4 w-4" />
                  Filter by Tag
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setFilterTag("")}
                  className={filterTag === "" ? "bg-muted" : ""}
                >
                  All Tags
                </DropdownMenuItem>
                {allTags.map((tag) => (
                  <DropdownMenuItem
                    key={tag}
                    onClick={() => setFilterTag(tag)}
                    className={filterTag === tag ? "bg-muted" : ""}
                  >
                    {tag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={filterVerified ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilterVerified(!filterVerified)}
              className="gap-1"
            >
              <span className={filterVerified ? "text-primary" : ""}>✓</span>
              Verified
            </Button>

            <Button
              variant={filterTopContributor ? "secondary" : "outline"}
              size="sm"
              onClick={() => setFilterTopContributor(!filterTopContributor)}
              className="gap-1"
            >
              <Award
                className={cn(
                  "h-4 w-4",
                  filterTopContributor && "text-amber-500",
                )}
              />
              Top Contributors
            </Button>

            {(searchQuery ||
              filterTag ||
              filterVerified ||
              filterTopContributor ||
              sortOption !== "reputation") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="gap-1"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active filters display */}
        {(filterTag || filterVerified || filterTopContributor) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {filterTag && (
              <Badge variant="secondary" className="gap-1">
                <Code className="h-3 w-3" />
                {filterTag}
                <button
                  className="ml-1 text-xs"
                  onClick={() => setFilterTag("")}
                >
                  ✕
                </button>
              </Badge>
            )}
            {filterVerified && (
              <Badge variant="secondary" className="gap-1">
                Verified
                <button
                  className="ml-1 text-xs"
                  onClick={() => setFilterVerified(false)}
                >
                  ✕
                </button>
              </Badge>
            )}
            {filterTopContributor && (
              <Badge variant="secondary" className="gap-1">
                <Award className="h-3 w-3 text-amber-500" />
                Top Contributors
                <button
                  className="ml-1 text-xs"
                  onClick={() => setFilterTopContributor(false)}
                >
                  ✕
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Stats summary */}
      {/* Enhanced Stats Summary Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium text-muted-foreground">
          Community Stats
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="overflow-hidden border-b-4 border-b-primary/70 transition-all duration-300 hover:shadow-md">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-primary/10 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Users
                    </p>
                    <p className="mt-1 text-3xl font-bold">
                      {DUMMY_USERS.length}
                    </p>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2">
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{ width: "100%" }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Active community of developers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-b-4 border-b-blue-400 transition-all duration-300 hover:shadow-md">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-400/10 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Verified Users
                    </p>
                    <p className="mt-1 text-3xl font-bold">
                      {DUMMY_USERS.filter((u) => u.isVerified).length}
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-400/10 p-2">
                    <BadgeCheck className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2">
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-blue-400"
                    style={{
                      width: `${(DUMMY_USERS.filter((u) => u.isVerified).length / DUMMY_USERS.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {Math.round(
                    (DUMMY_USERS.filter((u) => u.isVerified).length /
                      DUMMY_USERS.length) *
                      100,
                  )}
                  % of total community
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-b-4 border-b-amber-400 transition-all duration-300 hover:shadow-md">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-amber-400/10 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Top Contributors
                    </p>
                    <p className="mt-1 text-3xl font-bold">
                      {DUMMY_USERS.filter((u) => u.topContributor).length}
                    </p>
                  </div>
                  <div className="rounded-full bg-amber-400/10 p-2">
                    <Award className="h-6 w-6 text-amber-400" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2">
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-amber-400"
                    style={{
                      width: `${(DUMMY_USERS.filter((u) => u.topContributor).length / DUMMY_USERS.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Elite members with high contribution
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-b-4 border-b-emerald-400 transition-all duration-300 hover:shadow-md">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-emerald-400/10 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Skills & Topics
                    </p>
                    <p className="mt-1 text-3xl font-bold">{allTags.length}</p>
                  </div>
                  <div className="rounded-full bg-emerald-400/10 p-2">
                    <Hash className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {allTags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-emerald-400/10 text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    +{allTags.length - 3} more
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading users...</p>
        </div>
      ) : (
        <>
          {/* User grid */}
          {currentUsers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentUsers.map((user) => (
                <Card
                  key={user.userId}
                  className={cn(
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                    user.topContributor && "border-l-2 border-l-amber-400",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${user.userName}.png`}
                          />
                          <AvatarFallback>
                            {user.userName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <Link
                              href={`/users/${user.userId}`}
                              className="font-medium hover:text-primary hover:underline"
                            >
                              {user.userName}
                            </Link>
                            {user.isVerified && (
                              <span className="ml-1 text-xs text-primary">
                                ✓
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {user.role}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.company}
                          </p>
                        </div>
                      </div>

                      {user.topContributor && (
                        <Award className="h-5 w-5 text-amber-500" />
                      )}
                    </div>

                    <div className="mb-3 flex flex-wrap gap-1">
                      {user.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="px-1.5 py-0 text-xs"
                          onClick={() => setFilterTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {user.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="px-1.5 py-0 text-xs"
                        >
                          +{user.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500" />
                        <span className="font-semibold">
                          {user.reputation.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span>{user.questionCount} Qs</span>
                        <span className="mx-1">•</span>
                        <span>{user.answerCount} As</span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/users/${user.userId}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
              <Search className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No users found</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={resetFilters} className="mt-4">
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>

                  {currentPage > 2 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => handlePageChange(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                  </PaginationItem>

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Results summary */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Showing {indexOfFirstUser + 1}-
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </div>
        </>
      )}
    </section>
  );
}
