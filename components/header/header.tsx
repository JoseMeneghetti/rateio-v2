import Link from "next/link";
import HeaderTitle from "./header-title";
import LogoComponent from "./logo";

const Header = () => {
  return (
    <div className="hidden md:flex justify-between py-8 px-16 bg-zinc-900 shadow-lg">
      <LogoComponent />

      {/* <div>
        <HeaderTitle />
      </div> */}

      <div className="flex gap-12">
        {/* <Link href={"/#"} className="text-white text-lg">
          Procurar
        </Link>
        <Link href={"/#"} className="text-white text-lg">
          Limpar
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
