"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Sidebar from "./sidebar";
import { Rateio } from "@prisma/client";
import LogoComponent from "../header/logo";

interface MobileSidebarProps {
  rateios: Rateio[];
}
const MobileSidebar = ({ rateios }: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="p-4 bg-zinc-900">
          <LogoComponent />
        </div>
        <Sidebar rateios={rateios} setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
