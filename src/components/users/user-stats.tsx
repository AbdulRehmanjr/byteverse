import { Users, BadgeCheck, Award, CircleHelp } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/server";

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

const StatInfo = ({stat}: {stat: number}) => (
  <p className="mt-1 text-3xl font-bold font-code">{stat}</p>
);

export const UserStats = async () => {
  const stats = await api.user.getStats();
  return (
    <div className="mb-8">
      <h2 className="mb-4 font-heading text-lg font-medium text-primary">
        Community Stats
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="overflow-hidden border-b-4 border-b-primary/70 transition-all duration-300 hover:shadow-md">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-primary/10 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-sm font-medium text-muted-foreground">
                    Total Users
                  </p>
                  <StatInfo stat={stats.userCount} />
                </div>
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            <div className="px-4 pb-3 pt-2">
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
                  <p className="font-heading text-sm font-medium text-muted-foreground">
                    Verified Users
                  </p>
                  <StatInfo stat={ DUMMY_USERS.filter((u) => u.isVerified).length} />
                </div>
                <div className="rounded-full bg-blue-400/10 p-2">
                  <BadgeCheck className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="px-4 pb-3 pt-2">
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
                  <p className="font-heading text-sm font-medium text-muted-foreground">
                    Top Contributors
                  </p>
                  <StatInfo stat=  {DUMMY_USERS.filter((u) => u.topContributor).length}/>
                </div>
                <div className="rounded-full bg-amber-400/10 p-2">
                  <Award className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </div>
            <div className="px-4 pb-3 pt-2">
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
                  <p className="font-heading text-sm font-medium text-muted-foreground">
                    Question asked
                  </p>

                  <StatInfo stat={stats.questionCount}/>
                </div>
                <div className="rounded-full bg-emerald-400/10 p-2">
                  <CircleHelp className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </div>
            <div className="px-4 pb-3 pt-2">
              <p className="mt-2 text-xs text-muted-foreground">
                Your question,our solution
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
