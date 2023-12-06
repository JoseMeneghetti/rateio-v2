"use client";

import Heading from "@/components/common/heading";

import ModalAuthRateio from "@/components/dashboard/modal-auth-rateio";
import ModalSaveRateio from "@/components/dashboard/modal-save-rateio";
import SaveRateioButton from "@/components/dashboard/save-rateio-button";
import TabsComponent from "@/components/dashboard/tabs-component";

import { useAppSelector } from "@/store/hook";

import { selectActiveRateio } from "@/store/rateios/rateios.selectors";
import { FileWarningIcon, SplitIcon } from "lucide-react";

export default function Page() {
  const rateio = useAppSelector(selectActiveRateio);

  if (rateio.total?.length < 1) {
    return (
      <div className="p-4 lg:p-8">
        <Heading
          title="DashBoard - Rateio not Found"
          description="We have no information about your rateio, try to create a new one"
          icon={FileWarningIcon}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
        />
        <ModalAuthRateio />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex justify-between">
        <Heading
          title={`DashBoard - ${rateio.nameRateio ?? "Rateio"}`}
          description="See infos and control you rateio"
          icon={SplitIcon}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
        />
        <SaveRateioButton />
      </div>

      <TabsComponent rateio={rateio} />
      <ModalSaveRateio />
    </div>
  );
}
