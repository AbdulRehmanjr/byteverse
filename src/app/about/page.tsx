// AboutPage.jsx
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Github, Code2, Users, Zap, Laptop, LineChart, MessagesSquare, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="flex justify-center mb-6">
          <Code2 className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">About ByteVerse</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The premier global destination for programmers to connect, learn, and grow together.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-lg">
            <p className="leading-relaxed">
              ByteVerse empowers developers and technology enthusiasts by fostering seamless discussions, 
              knowledge sharing, and collaborative problem-solving. We've built an ecosystem where 
              technical expertise thrives, collaboration flourishes, and professional growth is a shared journey.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Platform Features</h2>
        
        <Tabs defaultValue="community" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="ai">AI Integration</TabsTrigger>
            <TabsTrigger value="tools">Developer Tools</TabsTrigger>
            <TabsTrigger value="growth">Growth & Learning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="community" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Users className="h-8 w-8" />}
                title="Vibrant Developer Community"
                description="Connect with like-minded developers, share insights, and build your professional network in a supportive environment."
              />
              <FeatureCard 
                icon={<MessagesSquare className="h-8 w-8" />}
                title="Organized Discussions"
                description="Participate in structured conversations across various programming topics, languages, and frameworks."
              />
              <FeatureCard 
                title="Reputation System"
                description="Earn recognition for your valuable contributions through our robust voting and reputation system."
                icon={<Badge className="h-8 w-8" />}
              />
              <FeatureCard 
                title="Private Messaging"
                description="Communicate securely with other members for more detailed discussions and collaborations."
                icon={<MessagesSquare className="h-8 w-8" />}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Zap className="h-8 w-8" />}
                title="AI-Powered Chatbot"
                description="Get real-time assistance with your programming queries through our advanced AI chatbot."
              />
              <FeatureCard 
                icon={<LineChart className="h-8 w-8" />}
                title="Personalized Recommendations"
                description="Discover relevant content and discussions tailored to your interests and activity patterns."
              />
              <FeatureCard 
                title="Intelligent Content Curation"
                description="Access high-quality, curated content that matters most to your learning journey."
                icon={<BookOpen className="h-8 w-8" />}
              />
              <FeatureCard 
                title="Enhanced Search Capabilities"
                description="Find precise solutions faster with our AI-powered search functionality."
                icon={<Zap className="h-8 w-8" />}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Code2 className="h-8 w-8" />}
                title="Code Snippet Sharing"
                description="Share, review, and debug code snippets collaboratively within the platform."
              />
              <FeatureCard 
                icon={<Github className="h-8 w-8" />}
                title="GitHub Integration"
                description="Connect your GitHub repositories for seamless project sharing and version control."
              />
              <FeatureCard 
                title="Moderation Tools"
                description="Community-driven moderation ensures high-quality content and respectful interactions."
                icon={<Users className="h-8 w-8" />}
              />
              <FeatureCard 
                title="Mobile Responsiveness"
                description="Access ByteVerse on any device with our seamless mobile-responsive design."
                icon={<Laptop className="h-8 w-8" />}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="growth" className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<BookOpen className="h-8 w-8" />}
                title="Personalized Learning Paths"
                description="Follow customized learning journeys tailored to your skill level and career goals."
              />
              <FeatureCard 
                icon={<LineChart className="h-8 w-8" />}
                title="Progress Analytics"
                description="Track your learning progress and engagement with detailed analytics and insights."
              />
              <FeatureCard 
                title="Mentorship Opportunities"
                description="Connect with experienced developers for guidance and career advancement."
                icon={<Users className="h-8 w-8" />}
              />
              <FeatureCard 
                title="Emerging Trends Insights"
                description="Stay updated with the latest programming trends and technologies through AI-curated content."
                icon={<Zap className="h-8 w-8" />}
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Technology Stack</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TechBadge name="Next.js" description="Fast, responsive interfaces" />
          <TechBadge name="tRPC" description="Seamless API communication" />
          <TechBadge name="TypeScript" description="Robust, type-safe code" />
          <TechBadge name="Tailwind CSS" description="Efficient styling" />
          <TechBadge name="Prisma" description="Modern database access" />
          <TechBadge name="PostgreSQL" description="Relational data management" />
          <TechBadge name="Firebase" description="Authentication & real-time updates" />
          <TechBadge name="Cloudinary" description="Media management" />
        </div>
      </section>

      {/* Vision Section */}
      <section className="mb-16">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              ByteVerse aims to redefine how programmers interact and innovate. By prioritizing 
              user-centric design and continuously evolving with AI-powered tools, we're creating 
              the most influential programming community on the internet. Join us in this shared 
              journey of growth and discovery.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Badge variant="outline" className="text-primary-foreground border-primary-foreground">
              Since 2025
            </Badge>
          </CardFooter>
        </Card>
      </section>

      {/* Team/Join Us Section */}
      <section>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join Our Community</CardTitle>
            <CardDescription>
              Become part of a thriving ecosystem of developers and technology enthusiasts
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Whether you're a seasoned developer or just starting your coding journey, 
              ByteVerse welcomes you to join our global community of problem-solvers and innovators.
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                Sign Up
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4">
                Learn More
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Helper Components
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const TechBadge = ({ name, description }: { name: string; description: string }) => (
  <div className="bg-secondary rounded-lg p-4 text-center">
    <h3 className="font-semibold mb-1">{name}</h3>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);