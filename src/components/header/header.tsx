import Image from "next/image";
import { NavBar } from "~/components/header/nav-bar";
import { Seacrh } from "~/components/header/search";



export const Header = () => {
  return (
    <header className="flex items-center gap-2 bg-gray-100 p-2">
      <div className="relative h-[70px] w-[60px]">
        <Image src="/logo.png" alt="byte-verse-logo image" fill sizes="100vw" />
      </div>
      <NavBar />
      <Seacrh/>
    </header>
  );
};
