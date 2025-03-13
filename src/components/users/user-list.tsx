import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Award, Star } from "lucide-react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import Link from "next/link";

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

export const UserList = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {DUMMY_USERS.map((user) => (
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
                      <span className="ml-1 text-xs text-primary">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
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
                  
                >
                  {tag}
                </Badge>
              ))}
              {user.tags.length > 3 && (
                <Badge variant="outline" className="px-1.5 py-0 text-xs">
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
  );
};
