import { type Metadata } from "next";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Shield, 
  FileText, 
  Lock, 
  User, 
  Bell, 
  RefreshCw 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ByteVerse",
  description: "Privacy Policy for the ByteVerse programming community forum",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-6 space-y-8">
      <div className="text-center">
        <h1 className="text-primary text-4xl font-bold tracking-tight font-heading">
          Privacy Policy
        </h1>
        <p className="mt-2 text-muted-foreground font-text">
          Last updated: April 5, 2025
        </p>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-lg dark:border-slate-800">
        <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-primary/10 to-transparent dark:border-slate-800">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <Badge variant="outline" className="text-xs font-normal">
              Privacy Document
            </Badge>
          </div>
          <CardTitle className="font-heading text-2xl text-primary">
            Privacy Policy
          </CardTitle>
          <p className="mt-2 text-muted-foreground font-text">
            This Privacy Policy describes how we collect, use, and protect your
            personal data when you use our website and services.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-4 flex items-start gap-3">
              <FileText className="mt-1 h-5 w-5 text-blue-500" />
              <div>
                <h2 className="text-xl font-semibold text-primary font-heading">
                  1. Information We Collect
                </h2>
                <p className="mt-2 text-gray-700 font-text">
                  We collect information when you register on our platform, interact
                  with our services, or use any of the features on our site. This may include:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                  <li>Personal information such as name, email address, and profile picture</li>
                  <li>Usage data including your interactions with our platform</li>
                  <li>Technical data such as IP address, browser type, and device information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-4 flex items-start gap-3">
              <User className="mt-1 h-5 w-5 text-green-500" />
              <div>
                <h2 className="text-xl font-semibold text-primary font-heading">
                  2. How We Use Your Information
                </h2>
                <p className="mt-2 text-gray-700 font-text">
                  We use your information to provide you with the best experience
                  possible, including to manage your account, improve our services, and
                  send relevant notifications. Specifically, we use your data to:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                  <li>Create and manage your account</li>
                  <li>Provide, personalize, and improve our services</li>
                  <li>Communicate with you about updates and features</li>
                  <li>Ensure the security and proper functioning of our platform</li>
                  <li>Analyze usage patterns to improve user experience</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-4 flex items-start gap-3">
              <Lock className="mt-1 h-5 w-5 text-purple-500" />
              <div>
                <h2 className="text-xl font-semibold text-primary font-heading">
                  3. Data Security
                </h2>
                <p className="mt-2 text-gray-700 font-text">
                  We implement a variety of security measures to protect your personal
                  information. However, please note that no method of transmission over
                  the internet is completely secure. Our security measures include:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Secure data storage and regular backups</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-4 flex items-start gap-3">
              <Shield className="mt-1 h-5 w-5 text-amber-500" />
              <div>
                <h2 className="text-xl font-semibold text-primary font-heading">
                  4. Your Rights
                </h2>
                <p className="mt-2 text-gray-700 font-text">
                  You have the right to access, update, or delete your personal data at
                  any time. If you have any concerns about your data, feel free to
                  contact us. Your rights include:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                  <li>Right to access your personal data</li>
                  <li>Right to correct inaccurate or incomplete data</li>
                  <li>Right to delete your personal data</li>
                  <li>Right to restrict or object to processing</li>
                  <li>Right to data portability</li>
                </ul>
                <p className="mt-2 text-gray-700 font-text">
                  To exercise these rights, please contact us at privacy@byteverse.com.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-4 flex items-start gap-3">
              <RefreshCw className="mt-1 h-5 w-5 text-blue-500" />
              <div>
                <h2 className="text-xl font-semibold text-primary font-heading">
                  5. Changes to This Policy
                </h2>
                <p className="mt-2 text-gray-700 font-text">
                  We may update this Privacy Policy from time to time. Any changes will
                  be posted on this page with an updated revision date. When we make significant 
                  changes to this Privacy Policy, we will notify you through a notice on our 
                  homepage or via email.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-4 flex items-start gap-3">
              <Bell className="mt-1 h-5 w-5 text-red-500" />
              <div>
                <h2 className="text-xl font-semibold text-primary font-heading">
                  6. Contact Us
                </h2>
                <p className="mt-2 text-gray-700 font-text">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <p className="mt-2 font-medium text-gray-700">
                  <strong>Email:</strong> privacy@byteverse.com<br />
                  <strong>Address:</strong> ByteVerse HQ, 123 Developer Way, Tech City, 12345
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            By using ByteVerse, you acknowledge that you have read and
            understand this Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}