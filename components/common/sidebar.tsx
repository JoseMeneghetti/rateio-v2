"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, SplitIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SidebarRateios from "./sidebar-rateios";
import { Rateio } from "@prisma/client";

interface SideBarProps {
  rateios: Rateio[];
  setIsOpen?: (isOpen: boolean) => void;
}
const Sidebar = ({ rateios, setIsOpen }: SideBarProps) => {
  const routes = [
    {
      label: "DashBoard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-700",
    },
    {
      label: "Create a new Rateio",
      icon: SplitIcon,
      href: "/create-rateio",
      color: "text-violet-500",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-zinc-900 text-white">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              onClick={() => {
                setIsOpen && setIsOpen(false);
              }}
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
          <SidebarRateios rateios={rateios} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
