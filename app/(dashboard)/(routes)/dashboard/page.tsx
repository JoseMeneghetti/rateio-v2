"use client";

import Heading from "@/components/common/heading";
import DashboardTabExpense from "@/components/dashboard/dashboard-tab-expenses";
import DashboardTabParticipants from "@/components/dashboard/dashboard-tab-participants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/store/hook";
import {
  selectFindHowManyPayWithoutDiferences,
  selectTotal,
} from "@/store/rateios/rateios.selectors";
import { FileWarningIcon, SplitIcon } from "lucide-react";

const DashboardPage = () => {
  const total = useAppSelector(selectTotal);

  if (total.length < 1) {
    return (
      <div className="px-4 lg:px-8">
        <Heading
          title="DashBoard - Rateio not Found"
          description="We have no information about your rateio, try to create a new one"
          icon={FileWarningIcon}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
        />
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8">
      <Heading
        title="DashBoard - Rateio Result"
        description="See infos and control you rateio"
        icon={SplitIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="expenses">Expenses Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <DashboardTabExpense />
        </TabsContent>
        <TabsContent value="participants">
          <DashboardTabParticipants />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
