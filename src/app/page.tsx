import React from "react";
import {
  MessageSquare,
  Network,
  Users,
  FileText,
  Home,
  MailCheck,
  ArrowRight,
  Code,
  Globe,
  Laptop
} from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <h1 className="font-heading text-4xl font-bold leading-tight text-primary md:text-5xl">
                Connect, Collaborate, and Build Better Together
              </h1>
              <p className="max-w-xl font-text text-lg text-gray-600">
                Join our community of developers to share knowledge, find
                solutions, and collaborate on exciting projects.
              </p>
              <div className="flex gap-4 pt-2">
                <Button type="button" size="lg">
                  Get Started
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative flex h-96 w-auto flex-1 justify-center">
              <Image
                src="/cpu.jpg"
                alt="Developer collaboration"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 font-text">
            <div>
              <p className="text-3xl font-bold text-primary">10M+</p>
              <p className="text-gray-600">Developers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">50M+</p>
              <p className="text-gray-600">Questions Answered</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">200K+</p>
              <p className="text-gray-600">Communities</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">5K+</p>
              <p className="text-gray-600">Enterprise Teams</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Features Showcase */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row-reverse">
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-3xl font-bold leading-tight text-primary md:text-4xl">
                Powerful Tools for Modern Development
              </h2>
              <p className="max-w-xl font-text text-lg text-gray-600">
                Access cutting-edge development tools, real-time collaboration features, and expert insights that help you build better software faster.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-indigo-100 p-1">
                    <Code size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary">Code Collaboration</h3>
                    <p className="font-text text-gray-600">Share, review, and collaborate on code in real-time with team members.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-indigo-100 p-1">
                    <Globe size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary">Global Community</h3>
                    <p className="font-text text-gray-600">Connect with developers from around the world to share knowledge and insights.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-indigo-100 p-1">
                    <Laptop size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary">Cross-Platform Support</h3>
                    <p className="font-text text-gray-600">Work seamlessly across desktop, web, and mobile platforms.</p>
                  </div>
                </div>
              </div>
              <Button type="button" className="mt-2" size="lg">
                Explore Features
              </Button>
            </div>
            <div className="relative flex h-96 w-auto flex-1 justify-center">
              <Image
                src="/team.jpg"
                alt="Developer team working together"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Cards Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary font-heading">
              Resources & Support
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 font-text">
              Everything you need to get the most out of our platform and
              community.
            </p>
          </div>

          <EnhancedLandingCards />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary font-heading">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 font-text">
              Don&apos;t just take our word for it — hear from some of our satisfied
              users.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex h-full flex-col">
                    <div className="mb-4 flex text-yellow-500">
                      {Array.from({length: 5}).map((_, i) => (
                        <svg
                          key={i}
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mb-6 flex-grow italic text-gray-700 font-text">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="mr-3 h-10 w-10 rounded-full bg-gray-300"/>
                      <div>
                        <p className="font-medium text-primary font-heading">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-600 font-text">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white font-heading">
            Ready to join our community?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-blue-100 font-text">
            Sign up today and start connecting with developers from around the
            world.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
            type="button"
              size="lg"
              variant="outline"
            >
              Sign Up for Free
            </Button>
            <Button
            type="button"
              variant="secondary"
              size="lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}

// Enhanced Landing Cards Component
const EnhancedLandingCards = () => {
  const cards = [
    {
      icon: MessageSquare,
      title: "Check out our FAQ about how DevConnect",
      description:
        "Find answers to commonly asked questions and learn how our platform works.",
      linkText: "Visit Help Center",
      linkUrl: "#",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Network,
      title: "Share feedback about our platform",
      description:
        "Join our meta community to provide feedback and shape the future of DevConnect.",
      linkText: "Visit Meta",
      linkUrl: "#",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Users,
      title: "Looking for help with Teams?",
      description:
        "Get support for your organization's Team workspace and collaboration tools.",
      linkText: "Visit Teams Help Center",
      linkUrl: "#",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: FileText,
      title: "Find legal documents",
      description: "Access legal documentation for our products and services.",
      linkText: "Visit Legal",
      linkUrl: "#",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      icon: Home,
      title: "Developer Communities",
      description:
        "Connect with specialized developer communities focused on specific technologies.",
      linkText: "Explore Communities",
      linkUrl: "#",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: MailCheck,
      title: "Newsletter Subscription",
      description:
        "Stay updated with the latest features, tips, and community highlights.",
      linkText: "Subscribe Now",
      linkUrl: "#",
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        >
          <CardContent className="p-0">
            <div className="flex h-full flex-col">
              <div className={`p-6 ${card.color}`}>
                <card.icon size={36} strokeWidth={1.5} />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-2 text-lg font-medium text-primary font-heading">
                  {card.title}
                </h3>
                <p className="mb-4 flex-grow text-gray-600 font-text">
                  {card.description}
                </p>
                <Link
                  href={card.linkUrl}
                  className="group flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  {card.linkText}
                  <ArrowRight
                    size={16}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Senior Developer at TechCorp",
    quote:
      "DevConnect has completely transformed how our team collaborates. The knowledge sharing capabilities are unmatched, and we've seen a 40% reduction in resolution time for technical issues.",
  },
  {
    name: "Michael Chen",
    title: "Indie Developer",
    quote:
      "As a solo developer, having access to such a supportive community has been invaluable. I've learned so much from other developers and found solutions to problems I couldn't solve on my own.",
  },
  {
    name: "Jessica Rodriguez",
    title: "CTO at StartupX",
    quote:
      "When we were scaling our engineering team, DevConnect provided the perfect platform for knowledge management and onboarding. It's now an essential part of our tech stack.",
  },
];