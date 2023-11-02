"use client";

import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import React from "react";

const HeaderTitle = () => {
  const { nameRateio } = useAppSelector((state: RootState) => state.rateio);
  return <h1 className="text-white font-bold text-2xl">{nameRateio}</h1>;
};

export default HeaderTitle;
