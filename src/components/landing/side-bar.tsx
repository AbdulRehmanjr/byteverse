import {
  Home,
  HelpCircle,
  Bookmark,
  Users,
  ClipboardList,
  Code,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const menus = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Questions", icon: HelpCircle, href: "/questions" },
  { title: "Posts", icon: ClipboardList, href: "/posts" },
  { title: "Bookmarks", icon: Bookmark, href: "/bookmark" },
  { title: "Users", icon: Users, href: "/users" },
  { title: "Snippets", icon: Code, href: "/snippets" },
];

export const LandingSideBar = () => {
  return (
    <aside className="col-span-2 border-r sticky top-0 h-screen">
      <div className="flex flex-col gap-2 p-4">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={item.href} key={item.title}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-accent"
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
