import Image from "next/image";
import { NavBar } from "~/components/header/nav-bar";
import { Seacrh } from "~/components/header/search";
import { Button } from "~/components/ui/button";
import { SignUpDialog } from "~/components/header/signup-dialog";

export const Header = () => {
  return (
    <header className="bg-gray-100 px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="relative h-16 w-32 shrink-0">
          <Image
            src="/logo.png"
            alt="byte-verse logo"
            fill
            sizes="(max-width: 768px) 128px,
                 (max-width: 1200px) 160px,
                 200px"
            className="object-contain"
            priority
          />
        </div>
        <NavBar />
        <Seacrh />
        <Button variant="outline" type="button">
          Log in
        </Button>
        <SignUpDialog />
      </div>
    </header>
  );
};
