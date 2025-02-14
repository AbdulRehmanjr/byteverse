// app/users/[username]/saves/page.tsx
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { 
  MoreHorizontal, 
  Edit, 
  Network,
  Clock,
  Calendar,
  Bookmark,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { profileEnd } from "console"

interface SavedQuestion {
  id: string
  title: string
  votes: number
  answers: number
  views: number
  tags: string[]
  author: {
    name: string
    reputation: number
    avatar: string
  }
  askedDate: string
  savedIn: string
}

interface ProfileData {
  username: string
  memberSince: string
  lastSeen: string
  visitedDays: number
  consecutiveDays: number
  avatarUrl: string
}

export default function SavesPage() {
  const profile: ProfileData = {
    username: "Rooma Maryam",
    memberSince: "6 months",
    lastSeen: "this week",
    visitedDays: 7,
    consecutiveDays: 1,
    avatarUrl: "/avatar.jpg"
  }

  const savedQuestions: SavedQuestion[] = [
    {
      id: "1",
      title: "What are the access specifiers in python? [duplicate]",
      votes: 3,
      answers: 2,
      views: 9000,
      tags: ["python", "python-2.7"],
      author: {
        name: "Sai Kiran",
        reputation: 65,
        avatar: "/avatar.jpg"
      },
      askedDate: "Aug 9, 2013 at 7:54",
      savedIn: "For later"
    }
  ]

  return (
    <div className="container py-6">
      {/* Profile Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-6">
          <Image
            src={profile.avatarUrl}
            alt={ '#'}
            width={128}
            height={128}
            className="bg-orange-400"
          />
          <div>
            <h1 className="text-3xl mb-4">{profile.username}</h1>
            <div className="flex gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Member for {profile.memberSince}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Last seen {profile.lastSeen}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Visited {profile.visitedDays} days, {profile.consecutiveDays} consecutive
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit profile
          </Button>
          <Button variant="outline">
            <Network className="w-4 h-4 mr-2" />
            Network profile
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="saves" className="mb-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="saves">Saves</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Saves Content */}
      <div className="flex gap-8">
        <div className="w-64">
          <div className="font-medium mb-2">All saves</div>
          <div className="text-muted-foreground mb-4">For later</div>
          <div className="font-medium mb-2">MY LISTS</div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl">All saves</h2>
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
              Create new list
            </Button>
          </div>

          <p className="text-lg mb-6">1 saved item</p>

          {/* Saved Questions */}
          {savedQuestions.map((question) => (
            <div key={question.id} className="border rounded-lg p-6">
              <div className="flex gap-4 mb-4">
                <div className="text-center text-muted-foreground">
                  <div>{question.votes} votes</div>
                  <div className="text-green-600">{question.answers} answers</div>
                  <div>{question.views.toLocaleString()} views</div>
                </div>
                <div className="flex-1">
                  <Link 
                    href="#" 
                    className="text-blue-500 hover:text-blue-600 text-lg mb-2 block"
                  >
                    {question.title}
                  </Link>
                  <div className="flex gap-1 mb-4">
                    {question.tags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary" 
                        className="bg-sky-50 hover:bg-sky-100 text-sky-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <Link href="#" className="text-blue-500 hover:text-blue-600">
                      {question.author.name}
                    </Link>
                    <div className="text-muted-foreground">
                      {question.author.reputation} asked {question.askedDate}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex items-center text-muted-foreground">
                    <Bookmark className="w-4 h-4 mr-1" />
                    Saved in {question.savedIn}
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}