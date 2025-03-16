// src/app/users/[userId]/page.tsx
import { Award, Briefcase, Calendar, Clock, Code, Globe, Mail, MapPin, Star, Users, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardTitle, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/server";
import dayjs from "dayjs";
import { Separator } from "~/components/ui/separator";
import { notFound } from "next/navigation";
import { QuestionsPagination } from "~/components/users/user-profile-pagination";


type PageProps = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function UserProfilePage({ params }: PageProps) {
  const paramProps = await params;

  // Fetch user data
  const userData = await api.profile.getProfileById({ userId: paramProps.userId });
  
  const user = userData?.UserProfile;
  const questions = userData?.Question ?? [];
  
  if (!user || !userData) {
    return notFound();
  }

  // Calculate total questions for display
  const totalQuestions = questions.length;

  return (
    <section className="mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <Card className="mb-8 overflow-hidden border-t-4 border-t-primary">
        <div className="relative h-32 bg-gradient-to-r from-primary/20 to-primary/5">
          {/* Profile background */}
        </div>
        
        <CardContent className="relative pb-6 pt-0">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <Avatar className="-mt-12 h-24 w-24 rounded-xl border-4 border-background shadow-md">
                <AvatarImage src={user.dp} />
                <AvatarFallback className="text-xl">
                  {userData.userName?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{userData.userName}</h1>
                  {user.isVerified && (
                    <Badge variant="outline" className="px-2 py-0 text-xs text-primary">
                      ✓ Verified
                    </Badge>
                  )}
                  {user.isTopContributor && (
                    <Badge className="gap-1">
                      <Award className="h-3 w-3 text-amber-500" /> Top Contributor
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-col gap-1">
                  {user.role && user.company && (
                    <p className="text-muted-foreground">{user.role} at {user.company}</p>
                  )}
                  <p className="flex items-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-4 w-4 text-amber-500" />
                    <span className="font-medium">{user.reputation?.toLocaleString() || 0}</span>
                    <span className="ml-1">reputation</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                {user.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={user.githubUrl} target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      GitHub
                    </Link>
                  </Button>
                )}
                {user.websiteUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={user.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-1 h-4 w-4" />
                      Website
                    </Link>
                  </Button>
                )}
                <Button variant="default" size="sm">
                  Follow
                </Button>
              </div>
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>0 followers</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Joined {dayjs(user.createdAt).format("DD MMM YYYY")}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            {user.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="mr-1 h-4 w-4" />
                <span>{user.company}</span>
              </div>
            )}
            {userData.email && user.showEmail && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-1 h-4 w-4" />
                <span>{userData.email}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Last active recently</span>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {user.bio && (
            <div>
              <p className="text-muted-foreground">{user.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* User Info */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="mb-2 font-semibold">Top Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(user.tags || []).map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    <Code className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="mb-2 font-semibold">Stats</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                  <span className="text-2xl font-bold">{totalQuestions}</span>
                  <span className="text-xs text-muted-foreground">Questions</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                  <span className="text-2xl font-bold">0</span>
                  <span className="text-xs text-muted-foreground">Answers</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                  <span className="text-2xl font-bold">
                    {user.reputation ? Math.round((user.reputation / 100) * 10) / 10 : 0}k
                  </span>
                  <span className="text-xs text-muted-foreground">Reputation</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-muted p-3">
                  <span className="text-2xl font-bold">0</span>
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
            {questions.length > 0 ? (
              <ul className="space-y-4 text-sm">
                {questions.slice(0, 3).map((question) => (
                  <li key={question.questionId} className="flex items-start gap-2">
                    <MessageCircle className="mt-1 h-4 w-4 text-primary" />
                    <div>
                      <p>Asked <Link href={`/questions/${question.questionId}`} className="font-medium hover:underline">{question.title}</Link></p>
                      <p className="text-xs text-muted-foreground">{dayjs(question.createdAt).format('DD MMM YYYY')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* User Questions with Client-Side Pagination */}
      <div className="mt-8">
        <QuestionsPagination questions={questions} questionsPerPage={3} />
      </div>
    </section>
  );
}