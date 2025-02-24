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
    <section className="mx-6 grid place-items-center gap-2">
      <div className="mb-32 flex flex-col items-center text-center">
        {/* Logo Circle */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
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
        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          Empowering the world to develop technology through collective
          knowledge.
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-xl text-gray-600">
          Our products and tools enable people to ask, share and learn at work
          or at home.
        </p>
      </div>

      {/* Stats Row */}
      <div className="w-full rounded-lg bg-gray-50 py-16">
        <div className="grid grid-cols-4 gap-8 px-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="mb-3 text-4xl font-bold text-gray-900">
                {stat.value}
              </h2>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stack Overflow Introduction Card */}
      <div className="mt-16 w-full">
        <Card className="bg-orange-50 p-8">
          <CardContent className="flex flex-col gap-8 p-0 md:flex-row md:items-center md:justify-between">
            <div className="space-y-6">
              <div className="w-48">
                <Image
                  src="/logo.png"
                  alt="Stack Overflow"
                  width={200}
                  height={50}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <p className="max-w-xl text-lg text-gray-700">
                We&apos;re best known for our public Q&A platform that millions
                of people visit every month to ask questions, learn, and share
                technical knowledge.
              </p>
              <Button className="bg-orange-500 text-white hover:bg-orange-600">
                Join the community
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">
                The Best of the Internet
                <span className="ml-2 text-gray-600">2021</span>
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
        <Card className="bg-white p-8">
          <CardContent className="flex items-start justify-between p-0">
            <div className="space-y-6">
              <div className="w-48">
                <Image
                  src="/logo.png"
                  alt="Stack Overflow API"
                  width={200}
                  height={50}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <p className="max-w-xl text-lg text-gray-700">
                A subscription-based API service that provides continuous access
                to Stack Overflow&apos;s public dataset to train and fine-tune
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
  );
}
