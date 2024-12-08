import Image from "next/image";
import { NavBar } from "~/components/header/nav-bar";

export const Header = () => {
  return (
    <header className="col-span-12 flex bg-gray-100 p-2 items-center gap-6">
      <div className="relative h-[70] w-[160px]">
        <Image src="/logo.png" alt="byte verse logo image" fill sizes="100vw" />
      </div>
      <NavBar/> 

    </header>
  );
};
