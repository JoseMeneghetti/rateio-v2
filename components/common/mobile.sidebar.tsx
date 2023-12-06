"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Sidebar from "./sidebar";
import { Rateio } from "@prisma/client";

interface MobileSidebarProps {
  rateios: Rateio[];
}
const MobileSidebar = ({ rateios }: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar rateios={rateios} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
