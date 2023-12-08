import Link from "next/link";
import React from "react";

const LogoComponent = () => {
  return (
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
  );
};

export default LogoComponent;
