"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* Adding a hidden title for accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div>
          <Link href="/">
            <h1 className="text-4xl font-semibold group">
              Seif
              <span className="text-accent group-hover:text-accent-hover transition-all">
                .
              </span>
            </h1>
          </Link>
        </div>
        <div className="mt-32 mb-40 text-center text-2xl">
          <nav className="flex flex-col justify-center items-center gap-8">
            {links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                onClick={handleLinkClick} // Close the Sheet on link click
                className={`${
                  link.path === pathName &&
                  "text-accent border-b-2 border-accent"
                } text-xl capitalize hover:text-accent-hover transition-all`}
              >
                {link.name}
              </Link>
            ))}
            <Link href={"/contact"}>
              <Button onClick={handleLinkClick}>Hire me</Button>
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
