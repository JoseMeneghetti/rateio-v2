"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./../ui/button";
import { Session } from "next-auth";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

interface LandingNavbarProps {
  session: Session | null;
}

const LandingNavbar = ({ session }: LandingNavbarProps) => {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-end">
      <div className="flex items-center gap-x-2">
        <Link href={session ? "/home" : "/auth/signup"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
