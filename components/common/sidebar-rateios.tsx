import React, { Suspense } from "react";
import { cn } from "@/lib/utils";
import { FolderIcon } from "lucide-react";
import { useAppSelector } from "@/store/hook";
import { selectFetchedNomeRateio } from "@/store/rateios/rateios.selectors";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Rateio } from "@prisma/client";

interface SidebarRateiosProps {
  rateios: Rateio[];
  setIsOpen?: (isOpen: boolean) => void;
}
const SidebarRateios = ({ rateios, setIsOpen }: SidebarRateiosProps) => {
  const nameRateio = useAppSelector(selectFetchedNomeRateio);
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <div
      className={cn(
        " bg-zinc-900 text-sm group flex flex-col p-3 w-full justify-start font-medium "
      )}
    >
      <div className="flex items-center flex-1">
        <FolderIcon className={cn("h-5 w-5 mr-3", "text-yellow-500")} />
        Rateios
      </div>
      <div className="py-4 ">
        {!rateios ? (
          <span>You have no rateios, try to create one.</span>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            {rateios?.map((rateio) => (
              <Button
                key={rateio.id}
                className={cn(
                  "hover:text-white hover:bg-white/10  transition text-zinc-400 w-full cursor-pointer justify-normal pl-8 mb-1 text-left rounded-lg text-xs",
                  rateio.nameRateio === nameRateio && pathname.includes("dashboard/") &&
                    "bg-white/10 text-whitetext-white"
                )}
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/dashboard/${rateio.id}`);
                  setIsOpen && setIsOpen(false);
                }}
              >
                {rateio?.nameRateio}
              </Button>
            ))}
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default SidebarRateios;
