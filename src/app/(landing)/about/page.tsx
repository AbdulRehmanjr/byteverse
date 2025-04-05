import React from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const DelayClasses = {
  0: "delay-[0ms]",
  1: "delay-[2000ms]",
  2: "delay-[4000ms]",
  3: "delay-[6000ms]",
} as const;

export const LoadingSkeletons = () => {
  const skeletonGroups = Array.from({ length: 4 }, (_, i) => ({
    items: [
      { width: "w-3/4" },
      { width: "w-1/2" },
      { width: "w-2/3" },
      { width: "w-2/3" },
      { width: "w-1/2" },
      { width: "w-3/4" },
    ],
    delayClass: DelayClasses[i as keyof typeof DelayClasses]
  }));

  return (
    <div className="w-full max-w-sm overflow-hidden">
      <div className="relative h-[400px]">
        {skeletonGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`animate-slide-up absolute inset-x-0 space-y-6 ${group.delayClass}`}
          >
            {group.items.map((item, itemIndex) => (
              <Skeleton
                key={itemIndex}
                className={`h-4 ${item.width} bg-gray-200/60`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const stats = [
    {
      value: "17 years",
      label: "of trusted and high-quality knowledge",
    },
    {
      value: "14 seconds",
      label: "average time between new questions",
    },
    {
      value: "58 million",
      label: "total questions and answers so far",
    },
    {
      value: "51 billion",
      label: "times knowledge has been reused",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            {/* Logo Circle */}
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-white"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-primary md:text-5xl font-heading">
              Empowering Developers Through Collective Knowledge
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-xl text-gray-600 font-text">
              ByteVerse is a community-driven platform where developers ask questions, share insights,
              and grow together. We believe in fostering a supportive environment for learning and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="mb-3 text-3xl font-bold text-primary">
                  {stat.value}
                </h2>
                <p className="text-sm text-gray-600 font-text">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Grid - Why Join */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary font-heading">
              Why Join ByteVerse?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 font-text">
              Discover the benefits of being part of our thriving developer community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-primary mb-4">Expert Insights</h3>
                <p className="font-text text-gray-600 mb-4">
                  Gain knowledge directly from experienced developers who have tackled similar challenges.
                  Our community includes professionals from top tech companies sharing their expertise.
                </p>
                <div className="mt-auto">
                  <Button variant="link" className="text-blue-600 p-0">
                    Meet Our Experts →
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-primary mb-4">Career Growth</h3>
                <p className="font-text text-gray-600 mb-4">
                  Building your reputation in our community can lead to career opportunities. Many employers
                  value active participation in developer communities like ByteVerse.
                </p>
                <div className="mt-auto">
                  <Button variant="link" className="text-blue-600 p-0">
                    Success Stories →
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-primary mb-4">Learning Resources</h3>
                <p className="font-text text-gray-600 mb-4">
                  Access a vast library of questions, answers, and discussions covering virtually every
                  programming topic, framework, and language.
                </p>
                <div className="mt-auto">
                  <Button variant="link" className="text-blue-600 p-0">
                    Browse Resources →
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-primary mb-4">Community Events</h3>
                <p className="font-text text-gray-600 mb-4">
                  Participate in hackathons, code challenges, and virtual meetups to connect with
                  fellow developers and sharpen your skills in a collaborative environment.
                </p>
                <div className="mt-auto">
                  <Button variant="link" className="text-blue-600 p-0">
                    Upcoming Events →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Q&A Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold font-heading text-primary mb-4">
              Join the ByteVerse Community
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-700 font-text">
              We&apos;re building a space where developers at every level ask questions, solve problems, and share technical knowledge.
            </p>
            <Button className="mt-6 bg-primary hover:bg-orange-600 text-white font-semibold px-6 py-3">
              Join the Community
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Sample Q&A Card 1 */}
            <Card className="shadow-lg border border-orange-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-primary mb-2">
                  How do I fix a React hydration error?
                </h3>
                <p className="text-gray-700 text-sm mb-4 font-text">
                  I&apos;m getting the error: <code className="bg-slate-100 px-1 py-0.5 rounded text-sm">Text content did not match</code> – what does it mean and how do I fix it?
                </p>
                <div className="bg-slate-50 p-3 rounded-lg text-sm text-gray-600 font-text">
                  💡 Tip: This usually happens when server and client render outputs differ.
                  Check any dynamic content inside SSR components.
                </div>
                <div className="mt-4 flex gap-2 text-xs text-blue-600">
                  <span>#react</span>
                  <span>#nextjs</span>
                  <span>#hydration</span>
                </div>
              </CardContent>
            </Card>

            {/* Sample Q&A Card 2 */}
            <Card className="shadow-lg border border-orange-100">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-heading text-primary mb-2">
                  Best practices for TypeScript interfaces vs. types?
                </h3>
                <p className="text-gray-700 text-sm mb-4 font-text">
                  When should I use interfaces and when should I use type aliases in TypeScript? Are there performance implications?
                </p>
                <div className="bg-slate-50 p-3 rounded-lg text-sm text-gray-600 font-text">
                  💡 Tip: Interfaces are often preferred for public API definitions as they can be extended later. Types are better for unions, mapped types, and conditional types.
                </div>
                <div className="mt-4 flex gap-2 text-xs text-blue-600">
                  <span>#typescript</span>
                  <span>#interfaces</span>
                  <span>#bestpractices</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API/Resources Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-orange-50 p-8">
            <CardContent className="flex flex-col gap-8 p-0 md:flex-row md:items-center md:justify-between">
              <div className="space-y-6">
                <div className="w-48">
                  <Image
                    src="/logo.png"
                    alt="ByteVerse"
                    width={200}
                    height={50}
                    className="h-auto w-full"
                    priority
                  />
                </div>
                <p className="max-w-xl text-lg text-gray-700 font-text">
                  We&apos;re best known for our public Q&A platform that millions
                  of people visit every month to ask questions, learn, and share
                  technical knowledge.
                </p>
                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                  Join the community
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium font-text">
                  The Best of the Internet
                  <span className="ml-2 text-gray-600">2024</span>
                </div>
                <div className="w-24">
                  <Image
                    src="/logo.png"
                    alt="Webby Awards"
                    width={100}
                    height={100}
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white p-8 mt-8">
            <CardContent className="flex items-start justify-between p-0 flex-col md:flex-row">
              <div className="space-y-6">
                <div className="w-48">
                  <Image
                    src="/logo.png"
                    alt="ByteVerse API"
                    width={200}
                    height={50}
                    className="h-auto w-full"
                    priority
                  />
                </div>
                <p className="max-w-xl text-lg text-gray-700 font-text">
                  A subscription-based API service that provides continuous access
                  to ByteVerse&apos;s public dataset to train and fine-tune
                  large language models.
                </p>
                <div className="flex items-center gap-4">
                  <div className="rounded-md bg-blue-50 px-4 py-2">
                    <span className="text-sm font-medium text-blue-700">
                      The API Awards Best AI API 2024
                    </span>
                  </div>
                </div>
                <Button variant="secondary">Learn more</Button>
              </div>
              <LoadingSkeletons />
            </CardContent>
          </Card>
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