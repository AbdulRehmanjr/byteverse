import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export const Spydev = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Teams Section */}
    <Card className="mb-8 bg-[#2D2D2D] text-white">
      <CardContent className="p-8">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <Image 
              src="/api/placeholder/200/40"
              alt="OverflowAI"
              width={200}
              height={40}
              className="h-10 w-auto"
            />
            <h2 className="text-2xl font-bold">Now available!</h2>
            <p className="max-w-md">
              A suite of GenAI tools for Stack Overflow for Teams that helps connect employees to knowledge faster.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Supercharge your Team
            </Button>
          </div>
          <Image 
            src="/home.png"
            alt="Teams Preview"
            width={500}
            height={300}
            className="hidden lg:block w-1/2"
          />
        </div>
      </CardContent>
    </Card>

    {/* Services Grid */}
    <div className="grid md:grid-cols-2 gap-8">
      {/* Advertising Card */}
      <Card>
        <CardContent className="p-8">
          <Image 
            src="/api/placeholder/200/40"
            alt="Stack Overflow Advertising"
            width={200}
            height={40}
            className="h-8 w-auto mb-6"
          />
          <h3 className="text-xl font-bold mb-4">
            Reach the worlds largest audience of developers and technologists.
          </h3>
          <div className="space-x-4">
            <Button>Advertising solutions</Button>
            <Button variant="outline">Build your employer brand</Button>
          </div>
        </CardContent>
      </Card>

      {/* API Card */}
      <Card>
        <CardContent className="p-8">
          <Image 
            src="/api/placeholder/200/40"
            alt="Stack Overflow API"
            width={200}
            height={40}
            className="h-8 w-auto mb-6"
          />
          <h3 className="text-xl font-bold mb-4">
            A subscription-based API service that provides continuous access to Stack Overflow&apos;s public dataset to train and fine-tune large language models.
          </h3>
          <Button>API solutions for business</Button>
        </CardContent>
      </Card>
    </div>

    {/* Bottom Section */}
    <div className="mt-12 flex justify-between items-center">
      <h2 className="text-xl">
        Explore technical topics and other disciplines across 170+ Q&A communities
      </h2>
      <Button variant="outline">Explore the network</Button>
    </div>
  </div>
  );
};
