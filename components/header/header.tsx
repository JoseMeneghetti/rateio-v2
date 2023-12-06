import Link from "next/link";
import HeaderTitle from "./header-title";

const Header = () => {
  return (
    <div className="hidden md:flex justify-between py-8 px-16 bg-zinc-900 shadow-lg">
      <div>
        <Link href={"/"} className="flex items-center gap-2">
          <h1
            className={
              "text-2xl text-transparent bg-clip-text bg-gradient-to-r font-bold  from-purple-600 to-purple-200"
            }
          >
            Rateio
          </h1>
          <h1 className={"text-2xl font-bold text-white"}>App</h1>
        </Link>
      </div>

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
