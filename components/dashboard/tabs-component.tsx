import DashboardTabExpense from "@/components/dashboard/dashboard-tab-expenses";
import DashboardTabParticipants from "@/components/dashboard/dashboard-tab-participants";
import DashboardTabSuggestions from "@/components/dashboard/dashboard-tab-suggestions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IFetchedRateio, IRateio } from "@/store/rateios/rateios.reducer";

interface TabsComponentProps {
  rateio: IFetchedRateio | IRateio;
}

const TabsComponent = ({ rateio }: TabsComponentProps) => {
  return (
    <Tabs defaultValue="expenses" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-[700px] mb-4">
        <TabsTrigger value="expenses" className="text-xs md:text-base">Expenses Overview</TabsTrigger>
        <TabsTrigger value="participants" className="text-xs md:text-base">Participants Overview</TabsTrigger>
        <TabsTrigger value="suggestions" className="text-xs md:text-base">Suggestions</TabsTrigger>
      </TabsList>
      <TabsContent value="expenses">
        <DashboardTabExpense
          whoPaid={rateio.whoPaid}
          listForResult={rateio.listForResult}
          participants={rateio.participants}
        />
      </TabsContent>
      <TabsContent value="participants">
        <DashboardTabParticipants
          listForResult={rateio.listForResult}
          total={rateio.total}
          whoPaid={rateio.whoPaid}
        />
      </TabsContent>
      <TabsContent value="suggestions">
        <DashboardTabSuggestions suggestions={rateio.suggestion} />
      </TabsContent>
    </Tabs>
  );
};

export default TabsComponent;
