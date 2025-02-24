import { Card, CardContent } from "~/components/ui/card";
import { MessageSquare, Network, Users, FileText, Home, MailCheck } from "lucide-react";
import { TestContext } from "node:test";

export const LandingCards = () => {
  const cards = [
    {
      icon: MessageSquare,
      title: "Check out our FAQ about how Stack Overflow",
      description: "works.",
      linkText: "Visit Help Center",
      linkUrl: "#",
    },
    {
      icon: Network,
      title: "To share feedback about our platform",
      description: "please visit our meta community.",
      linkText: "Visit Meta",
      linkUrl: "#",
    },
    {
      icon: Users,
      title: "Looking for help with Stack Overflow for Teams?",
      description: "",
      linkText: "Visit Teams Help Center",
      linkUrl: "#",
    },
    {
      icon: FileText,
      title: "Find legal documents",
      description: "for our products and services.",
      linkText: "Visit Legal",
      linkUrl: "#",
    },
    {
      icon :Home,
      title: "Find Leagel Test Content",
      description: "sample description",
      linkText: "Visit Sample page",
      linkurl: "#"
      
    },
    {icon:MailCheck,
      title:"Mail Box",
      description : "Email Sample Description",
      linkText : "Visit sample mail",
      linkurl:"https://mail.google.com/mail/u/0/#inbox"
    }
  ];

  return (
    <div className="flex flex-wrap gap-6 p-6">
      {cards.map((card, index) => (
        <Card className="w-64" key={index}>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="text-gray-600">
                <card.icon size={48} strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium text-gray-900">{card.title}</p>
                <p className="text-sm text-gray-600">{card.description}</p>
                <a
                  href={card.linkUrl}
                  className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800"
                >
                  {card.linkText} →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
