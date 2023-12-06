import { Rateio } from "@prisma/client";
import MobileSidebar from "./mobile.sidebar";

interface NavBarProps {
  rateios: Rateio[];
}
const NavBar = async ({ rateios }: NavBarProps) => {
  return (
    <div className="flex items-center">
      <MobileSidebar rateios={rateios} />
    </div>
  );
};

export default NavBar;
