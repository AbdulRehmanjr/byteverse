import Link from "next/link"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Avatar } from "~/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Card, CardContent,} from "~/components/ui/card"

interface Question {
  votes: number
  answers: number
  views: number
  title: string
  description: string
  tags: string[]
  author: {
    name: string
    score: number
    avatar: string
  }
  timeAgo: string
}

export default function QuestionPage() {
  const questions: Question[] = [
    {
      votes: 0,
      answers: 0,
      views: 4,
      title: "problems with my button background color and hover and active states",
      description: "I'm working on the Odin project as a way to shake off the rust, being an ex bootcamper from 2 years ago. I'm on the project where you have to take the rock paper scissors game you've made previously ...",
      tags: ["html", "css", "button", "background"],
      author: {
        name: "John Rizzo",
        score: 3,
        avatar: "/avatars/john-rizzo.jpg"
      },
      timeAgo: "1 min ago"
    },
    {
      votes: 0,
      answers: 0,
      views: 5,
      title: `MariaDB  slow query wth left join, order by and "Copying to tmp table"`,
      description: "MariaDB – slow query with Copying to tmp table This is my query: SELECT vtiger_assets.asset_no, vtiger_assets.assetstatus, vtiger_crmentity_user_field.starred FROM vtiger_assets INNER JOIN ...",
      tags: ["mysql", "performance", "mariadb"],
      author: {
        name: "Юрий Глущенко",
        score: 21,
        avatar: "/avatars/user.jpg"
      },
      timeAgo: "2 mins ago"
    },
    {
      votes: 0,
      answers: 0,
      views: 4,
      title: "Snowflake TASK got stuck in STARTED state",
      description: "I Created TASK like below CREATE OR REPLACE TASK test_task WAREHOUSE = TEST_WH SCHEDULE = '1 MINUTE' AS BEGIN CALL SP_TASKEXECUTION('CREATE_TABLE_PROC_NAME'); END; I see task created...",
      tags: ["snowflake-cloud-data-platform", "data-engineering"],
      author: {
        name: "phani437",
        score: 11,
        avatar: "/avatars/user.jpg"
      },
      timeAgo: "3 mins ago"
    }
  ]

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-normal mb-2">Newest Questions</h1>
          <p className="text-sm text-muted-foreground">24,252,673 questions</p>
        </div>
        <Button className="bg-blue-500 hover:bg-green-600">Ask Question</Button>
      </div>

      <div className="flex justify-between items-center gap-4 mb-6">
        <Tabs defaultValue="newest" className="w-full">
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="bountied">
              Bountied
              <Badge variant="secondary" className="ml-2 bg-blue-500 text-white">
                76
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            <TabsTrigger value="more">More</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" className="whitespace-nowrap">
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={index} className="shadow-none">
            <CardContent className="flex gap-6 p-6">
              <div className="flex flex-col items-end gap-1 min-w-[85px] text-sm text-muted-foreground">
                <span>{question.votes} votes</span>
                <span className={`${question.answers > 0 ? 'text-green-600 border border-green-600 px-1' : ''}`}>
                  {question.answers} answers
                </span>
                <span>{question.views} views</span>
              </div>

              <div className="flex-1">
                <Link 
                  href="#" 
                  className="text-lg text-red-500 hover:text-blue-600 mb-2 block"
                >
                  {question.title}
                </Link>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {question.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
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

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Avatar className="w-4 h-4" />
                    <Link href="#" className="hover:text-blue-500">
                      {question.author.name}
                    </Link>
                    <span>{question.author.score}</span>
                    <span>asked {question.timeAgo}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
