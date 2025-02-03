import {
    Card,
    CardDescription,
    CardFooter,
    CardTitle,
  } from "~/components/ui/card";
  import { Button } from "~/components/ui/button";
  import Link from "next/link";
  
  export const Noor = () => {
    const cards = [
      {
        title: "Advertising",
        description:
          "Promote your brand and connect with millions of developers worldwide through tailored advertising solutions.",
        buttons: [
          { text: "Solutions", link: "#" },
          { text: "Brand", link: "#", variant: "link" as const },
        ],
      },
      {
        title: "API Access",
        description:
          "Gain continuous access to a structured dataset that helps train AI models and enhance machine learning capabilities.",
        buttons: [
          { text: "API Solutions", link: "#" },
          { text: "Learn More", link: "#", variant: "link" as const },
        ],
      },
    ];
  
    return (
      <div className="flex gap-6 p-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 w-80 h-full flex flex-col justify-between"
          >
            <div className="h-full flex flex-col">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {card.title}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 min-h-[80px]">
                {card.description}
              </CardDescription>
            </div>
            <CardFooter className="flex gap-4 mt-4 justify-start">
              {card.buttons.map((btn, i) => (
                <Button key={i} variant={btn.variant ?? "default"} asChild>
                  <Link href={btn.link}>{btn.text}</Link>
                </Button>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };
  