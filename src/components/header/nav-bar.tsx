import Link from "next/link";
import { Button } from "~/components/ui/button";

const links = [
  { title: "About", link: "#" },
  { title: "Products", link: "#" },
  { title: "OverflowAI", link: "#" },
];
export const NavBar = () => {
  return (
    <nav className="flex items-center gap-4">
      {links.map((link,index) => (
        <Button variant="link" key={index} asChild>
          <Link href={link.link}>{link.title}</Link>
        </Button>
      ))}
    </nav>
  );
};