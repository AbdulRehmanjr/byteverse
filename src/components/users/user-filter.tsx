"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Search, SortAsc, Code, Award } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
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

export const UserFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("reputation");
  const [filterTag, setFilterTag] = useState("");
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterTopContributor, setFilterTopContributor] = useState(false);

  // Number of users per page

  // Get all tags for the filter dropdown
  const allTags = Array.from(
    new Set(DUMMY_USERS.flatMap((user) => user.tags)),
  ).sort();

  // Filter and sort users based on current criteria

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
    <div className="mb-6 flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by username, role, or company..."
          className="mr-10 pl-10"
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
            className={cn("h-4 w-4", filterTopContributor && "text-amber-500")}
          />
          Top Contributors
        </Button>

        {(searchQuery ||
          filterTag ||
          filterVerified ||
          filterTopContributor ||
          sortOption !== "reputation") && (
          <Button
            type="button"
            size="sm"
            onClick={resetFilters}
            className="gap-1"
          >
            Reset Filters
          </Button>
        )}
        {(filterTag || filterVerified || filterTopContributor) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {filterTag && (
              <Badge variant="secondary" className="gap-1">
                <Code className="h-3 w-3" />
                {filterTag}
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-1 text-xs"
                  onClick={() => setFilterTag("")}
                >
                  ✕
                </Button>
              </Badge>
            )}
            {filterVerified && (
              <Badge variant="secondary" className="gap-1">
                Verified
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-1 text-xs"
                  onClick={() => setFilterVerified(false)}
                >
                  ✕
                </Button>
              </Badge>
            )}
            {filterTopContributor && (
              <Badge variant="secondary" className="gap-1">
                <Award className="h-3 w-3 text-amber-500" />
                Top Contributors
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-1 text-xs"
                  onClick={() => setFilterTopContributor(false)}
                >
                  ✕
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
