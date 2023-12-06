"use client";

import { useAppSelector } from "@/store/hook";
import { selectActiveNomeRateio } from "@/store/rateios/rateios.selectors";
import React from "react";

const HeaderTitle = () => {
  const nameRateio = useAppSelector(selectActiveNomeRateio);
  return <h1 className="text-white font-bold text-2xl">{nameRateio}</h1>;
};

export default HeaderTitle;
