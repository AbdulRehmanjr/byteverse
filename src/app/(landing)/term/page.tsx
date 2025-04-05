import { type Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription } from "~/components/ui/alert";

export const metadata: Metadata = {
  title: "Terms and Conditions | ByteVerse",
  description:
    "Terms and conditions for using the ByteVerse programming community forum",
};

export default function TermsPage() {
  return (
    <div className="mx-6 space-y-8 mb-6">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-primary">
          Terms and Conditions
        </h1>
        <p className="mt-2 font-text text-muted-foreground">
          Last updated: March 13, 2025
        </p>
      </div>

      <Alert>
        <AlertDescription>
          Please read these terms and conditions carefully before using
          ByteVerse. By accessing or using our platform, you agree to be bound
          by these terms.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            1. Acceptance of Terms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            By accessing or using ByteVerse, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions. If
            you do not agree to these terms, please do not use our platform.
          </p>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting to the platform. Your
            continued use of ByteVerse constitutes your acceptance of the
            modified terms.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            2. User Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            To access certain features of ByteVerse, you must create an account.
            You are responsible for:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>Restricting access to your account</li>
            <li>All activities that occur under your account</li>
            <li>
              Ensuring that your account information is accurate and up-to-date
            </li>
          </ul>
          <p>
            We reserve the right to terminate accounts that violate our terms or
            have been inactive for an extended period.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            3. User Conduct
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>As a ByteVerse user, you agree not to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Post content that is unlawful, harmful, threatening, abusive,
              harassing, defamatory, or otherwise objectionable
            </li>
            <li>
              Upload or share content that infringes on intellectual property
              rights
            </li>
            <li>
              Impersonate any person or entity or falsely state or misrepresent
              your affiliation
            </li>
            <li>
              Engage in any activity that interferes with or disrupts the
              platform
            </li>
            <li>
              Use the platform to distribute malware, viruses, or other
              malicious code
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the platform
            </li>
            <li>Harvest or collect user information without consent</li>
            <li>Use the platform for any illegal purpose</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            4. Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Users retain ownership of content they post on ByteVerse. By posting
            content, you grant ByteVerse a worldwide, non-exclusive,
            royalty-free license to use, reproduce, modify, adapt, publish,
            translate, and distribute your content in any existing or future
            media formats.
          </p>
          <p>
            We do not claim ownership of your content, but we need these rights
            to operate the platform. You represent and warrant that you own or
            have the necessary rights to the content you post and that your
            content does not violate the rights of any third party.
          </p>
          <p>
            We reserve the right to remove any content that violates these terms
            or that we find objectionable for any reason.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            5. Intellectual Property
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            ByteVerse&apos;s name, logo, and all related names, logos, product
            and service names, designs, and slogans are trademarks of ByteVerse
            or its affiliates. You may not use these marks without our prior
            written permission.
          </p>
          <p>
            All content, features, and functionality of the platform, including
            but not limited to text, graphics, logos, icons, images, audio
            clips, digital downloads, data compilations, and software, are the
            exclusive property of ByteVerse or its content suppliers and
            protected by copyright, trademark, and other intellectual property
            laws.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            6. AI Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            ByteVerse incorporates AI-driven features to enhance user
            experience. By using these features, you understand and agree that:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>AI-generated content may not always be accurate or complete</li>
            <li>
              We may use your interactions with AI features to improve our
              services
            </li>
            <li>
              AI-generated recommendations are for informational purposes only
            </li>
            <li>
              You should verify AI-provided information when making important
              decisions
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            7. Limitation of Liability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            ByteVerse is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We make no warranties, expressed or implied,
            regarding the operation of the platform or the information, content,
            or materials included on the platform.
          </p>
          <p>
            We shall not be liable for any direct, indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            of or inability to use the platform.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {" "}
            8. Governing Law
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of [Your Jurisdiction], without regard to
            its conflict of law principles.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            9. Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p className="mt-2 font-medium">legal@byteverse.com</p>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          By using ByteVerse, you acknowledge that you have read, understood,
          and agree to be bound by these Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
