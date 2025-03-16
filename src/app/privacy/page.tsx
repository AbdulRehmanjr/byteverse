
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "~components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs";

export const metadata: Metadata = {
  title: "Privacy Policy | ByteVerse",
  description: "Privacy policy for ByteVerse programming community forum",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: March 13, 2025</p>
        </div>

        <Alert></Alert>