import Image from "next/image"
import { NavBar } from "~/components/header/nav-bar";
import { Search } from "./search";

export const Header = () => {
  return (
    <header className="col-span-12 bg-gray-100 p-2 flex items-center gap-2">
      <div className="relative h-[70px] w-[60px]">
        <Image src="/logo.png" alt="logo img " fill sizes="200vw"/>
      </div>
      {/* <h1 className="text-xl font-mono text-green-500">StackOverflow Header </h1> */}
      <NavBar/>
      <Search/>
      
    </header>
  );
};
