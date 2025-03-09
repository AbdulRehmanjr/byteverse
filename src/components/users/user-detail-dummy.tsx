"use client";

import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "~/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { 
  Star, 
  Code, 
  MessageSquare, 
  Award, 
  Calendar, 
  Clock, 
  Github, 
  Globe, 
  ChevronUp, 
  Check, 
  MessageCircle, 
  Eye,
  Bookmark,
  MapPin,
  Briefcase,
  Mail,
  Users
} from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { format } from "date-fns";

// This would be fetched from API in a real app
const DUMMY_USER = {
  userId: "user3",
  userName: "techguru",
  email: "guru@example.com",
  reputation: 23547,
  tags: ["devops", "aws", "kubernetes", "docker", "terraform", "jenkins", "github-actions", "ci/cd", "microservices"],
  questionCount: 42,
  answerCount: 276,
  followers: 1245,
  following: 93,
  bio: "DevOps architect helping teams build robust CI/CD pipelines and infrastructure as code. I specialize in containerization, orchestration, and automating everything that can be automated. Passionate about mentoring junior engineers and sharing knowledge through open source contributions.",
  isVerified: true,
  joinedAt: "2017-11-05",
  topContributor: true,
  lastActive: "1 day ago",
  githubUrl: "https://github.com/techguru",
  websiteUrl: "https://techguru.io",
  location: "San Francisco, CA",
  company: "CloudScaleOps, Inc.",
  role: "Senior DevOps Architect",
  achievements: [
    { title: "Gold Badge: Kubernetes", count: 1 },
    { title: "Silver Badge: AWS", count: 1 },
    { title: "Top Answerer: DevOps", year: 2023 },
    { title: "Great Answer", count: 15 },
    { title: "Popular Question", count: 8 },
  ]
};

// Dummy questions by the user
const DUMMY_QUESTIONS = [
  {
    questionId: "q1",
    title: "Best practices for securing Kubernetes secrets",
    content: "I'm working on a production Kubernetes deployment and want to ensure our secrets are properly secured. What are the current best practices beyond using the built-in secrets feature?",
    tags: ["kubernetes", "security", "devops", "docker"],
    createdAt: "2023-10-15",
    _count: { 
      Answer: 12,
      QuestionLike: 24
    },
    views: 982
  },
  {
    questionId: "q2",
    title: "How to optimize CI/CD pipeline for monorepo with microservices",
    content: "Our team has a monorepo containing 20+ microservices. Our current CI/CD pipeline runs all tests for every service on each commit. How can we optimize this to only test and deploy the affected services?",
    tags: ["ci/cd", "github-actions", "microservices", "devops"],
    createdAt: "2023-08-22",
    _count: { 
      Answer: 8,
      QuestionLike: 31
    },
    views: 1243
  },
  {
    questionId: "q3",
    title: "Automating Terraform state management in a team environment",
    content: "How do you handle Terraform state files in a team where multiple people are making infrastructure changes? Looking for automation solutions that prevent state conflicts.",
    tags: ["terraform", "devops", "infrastructure-as-code", "automation"],
    createdAt: "2023-05-17",
    _count: { 
      Answer: 15,
      QuestionLike: 42
    },
    views: 2156
  }
];

// Dummy answers by the user
const DUMMY_ANSWERS = [
  {
    answerId: "a1",
    questionId: "q5",
    questionTitle: "How to implement blue-green deployments with AWS ECS?",
    content: "Blue-green deployments with AWS ECS can be achieved using either the built-in deployment circuit breaker or with AWS CodeDeploy. Here's how you set it up with CodeDeploy...",
    vote: 47,
    createdAt: "2023-09-28",
    accepted: true
  },
  {
    answerId: "a2",
    questionId: "q6",
    questionTitle: "Differences between Docker Swarm and Kubernetes for small teams",
    content: "For small teams, Docker Swarm offers simplicity while Kubernetes offers scalability. Here are the key differences to consider...",
    vote: 35,
    createdAt: "2023-07-14",
    accepted: false
  },
  {
    answerId: "a3",
    questionId: "q7", 
    questionTitle: "Handling secret rotation in a microservices architecture",
    content: "Secret rotation in microservices requires a centralized approach. I recommend using HashiCorp Vault with the following configuration...",
    vote: 62,
    createdAt: "2023-04-02",
    accepted: true
  },
  {
    answerId: "a4",
    questionId: "q8",
    questionTitle: "When should you use AWS Lambda vs. ECS for containerized applications?",
    content: "The decision between Lambda and ECS depends on several factors. For event-driven workloads with variable traffic, Lambda is often better. For consistent workloads or applications requiring specific runtime environments, ECS is preferable...",
    vote: 83,
    createdAt: "2023-02-18",
    accepted: true
  }
];

export default function UserProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 overflow-hidden border-t-4 border-t-primary">
        <div className="relative h-32 bg-gradient-to-r from-primary/20 to-primary/5">
          {/* Profile background */}
        </div>
        
        <CardContent className="relative pb-6 pt-0">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <Avatar className="-mt-12 h-24 w-24 rounded-xl border-4 border-background shadow-md">
                <AvatarImage src={`https://avatar.vercel.sh/${DUMMY_USER.userName}.png`} />
                <AvatarFallback className="text-xl">
                  {DUMMY_USER.userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{DUMMY_USER.userName}</h1>
                  {DUMMY_USER.isVerified && (
                    <Badge variant="outline" className="px-2 py-0 text-xs text-primary">
                      ✓ Verified
                    </Badge>
                  )}
                  {DUMMY_USER.topContributor && (
                    <Badge className="gap-1">
                      <Award className="h-3 w-3 text-amber-500" /> Top Contributor
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">{DUMMY_USER.role} at {DUMMY_USER.company}</p>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    <span className="font-medium">{DUMMY_USER.reputation.toLocaleString()}</span>
                    <span className="ml-1">reputation</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={DUMMY_USER.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                {DUMMY_USER.websiteUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={DUMMY_USER.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-1 h-4 w-4" />
                      Website
                    </Link>
                  </Button>
                )}
                <Button 
                  variant={isFollowing ? "secondary" : "default"} 
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? (
                    <>
                      <Check className="mr-1 h-4 w-4" />
                      Following
                    </>
                  ) : (
                    "Follow"
                  )}
                </Button>
              </div>
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{DUMMY_USER.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Joined {new Date(DUMMY_USER.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{DUMMY_USER.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-1 h-4 w-4" />
              <span>{DUMMY_USER.company}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-1 h-4 w-4" />
              <span>{DUMMY_USER.email}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Last active {DUMMY_USER.lastActive}</span>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <p className="text-muted-foreground">{DUMMY_USER.bio}</p>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold">Top Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {DUMMY_USER.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        <Code className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-2 font-semibold">Achievements</h3>
                  <ul className="space-y-2">
                    {DUMMY_USER.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>{achievement.title}</span>
                        {achievement.count && <span>×{achievement.count}</span>}
                        {achievement.year && <span>({achievement.year})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-2 font-semibold">Stats</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                      <span className="text-2xl font-bold">{DUMMY_USER.questionCount}</span>
                      <span className="text-xs text-muted-foreground">Questions</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                      <span className="text-2xl font-bold">{DUMMY_USER.answerCount}</span>
                      <span className="text-xs text-muted-foreground">Answers</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                      <span className="text-2xl font-bold">
                        {Math.round((DUMMY_USER.reputation / 100) * 10) / 10}k
                      </span>
                      <span className="text-xs text-muted-foreground">Reputation</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                      <span className="text-2xl font-bold">
                        {DUMMY_USER.followers > 1000 
                          ? `${Math.round(DUMMY_USER.followers / 100) / 10}k` 
                          : DUMMY_USER.followers}
                      </span>
                      <span className="text-xs text-muted-foreground">Followers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-2">
                    <MessageSquare className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p>Answered <Link href="#" className="font-medium hover:underline">How to implement blue-green deployments with AWS ECS?</Link></p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p>Received 150 reputation points for an answer</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageCircle className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p>Asked <Link href="#" className="font-medium hover:underline">Best practices for securing Kubernetes secrets</Link></p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p>Earned badge: Top Answerer: DevOps</p>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View Full Activity Log
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="questions" className="mt-6">
          <h2 className="mb-4 text-xl font-bold">Questions ({DUMMY_QUESTIONS.length})</h2>
          <div className="space-y-4">
            {DUMMY_QUESTIONS.map((question) => (
              <Card key={question.questionId} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <Link 
                    href={`/questions/${question.questionId}`}
                    className="text-lg font-semibold hover:text-primary hover:underline"
                  >
                    {question.title}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {question.content}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {question.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="px-2 py-0 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 py-2">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center">
                      <MessageCircle className="mr-1 h-3 w-3" />
                      <span>{question._count.Answer} answers</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3" />
                      <span>{question._count.QuestionLike} likes</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      <span>{question.views} views</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/questions/${question.questionId}`}>
                      View Question
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">
              View All Questions
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="answers" className="mt-6">
          <h2 className="mb-4 text-xl font-bold">Answers ({DUMMY_ANSWERS.length})</h2>
          <div className="space-y-4">
            {DUMMY_ANSWERS.map((answer) => (
              <Card key={answer.answerId} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <Link 
                    href={`/questions/${answer.questionId}`}
                    className="text-lg font-semibold hover:text-primary hover:underline"
                  >
                    {answer.questionTitle}
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{new Date(answer.createdAt).toLocaleDateString()}</span>
                    </div>
                    {answer.accepted && (
                      <Badge variant="success" className="px-2 py-0 text-xs">
                        <Check className="mr-1 h-3 w-3" /> Accepted
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {answer.content}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center">
                      <ChevronUp className="mr-1 h-4 w-4 text-emerald-500" />
                      <span className="font-medium">{answer.vote}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">votes</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/questions/${answer.questionId}`}>
                      View Answer
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">
              View All Answers
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <h2 className="mb-4 text-xl font-bold">Activity Timeline</h2>
          <div className="relative border-l-2 border-l-muted pl-6">
            {/* Timeline items */}
            <div className="mb-8 relative">
              <div className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Star className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="rounded-lg border p-4 shadow-sm">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-medium">Earned 150 reputation</h3>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Received upvotes for answer on "How to implement blue-green deployments with AWS ECS?"
                </p>
              </div>
            </div>
            
            <div className="mb-8 relative">
              <div className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <MessageSquare className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="rounded-lg border p-4 shadow-sm">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-medium">Posted an answer</h3>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Answered "How to implement blue-green deployments with AWS ECS?"
                </p>
                <Button variant="ghost" size="sm" className="mt-2" asChild>
                  <Link href="#">View Answer</Link>
                </Button>
              </div>
            </div>
            
            <div className="mb-8 relative">
              <div className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <MessageCircle className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="rounded-lg border p-4 shadow-sm">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-medium">Asked a question</h3>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Asked "Best practices for securing Kubernetes secrets"
                </p>
                <Button variant="ghost" size="sm" className="mt-2" asChild>
                  <Link href="#">View Question</Link>
                </Button>
              </div>
            </div>
            
            <div className="mb-8 relative">
              <div className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Award className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="rounded-lg border p-4 shadow-sm">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-medium">Earned a badge</h3>
                  <span className="text-xs text-muted-foreground">2 weeks ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Received the "Top Answerer: DevOps" badge for 2023
                </p>
              </div>
            </div>
            
            <div className="mb-8 relative">
              <div className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Star className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="rounded-lg border p-4 shadow-sm">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-medium">Earned 200 reputation</h3>
                  <span className="text-xs text-muted-foreground">3 weeks ago</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Received upvotes for answer on "When should you use AWS Lambda vs. ECS for containerized applications?"
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">
              Load More Activity
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Similar Developers</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://avatar.vercel.sh/dev${i}.png`} />
                    <AvatarFallback>D{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href="#" className="font-medium hover:text-primary hover:underline">
                      devmaster{i}
                    </Link>
                    <p className="text-xs text-muted-foreground">Senior Developer</p>
                  </div>
                </div>
                <div className="mb-2 flex flex-wrap gap-1">
                  <Badge variant="outline" className="px-1 py-0 text-xs">
                    {i === 1 ? "devops" : i === 2 ? "aws" : i === 3 ? "kubernetes" : "docker"}
                  </Badge>
                  <Badge variant="outline" className="px-1 py-0 text-xs">
                    {i === 1 ? "terraform" : i === 2 ? "javascript" : i === 3 ? "python" : "react"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{5000 + i * 1000} reputation</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}