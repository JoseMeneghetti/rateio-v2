import Heading from "@/components/common/heading";
import { SplitIcon } from "lucide-react";

const DashboardHomePage = () => {
  return (
    <div className="p-4 lg:p-8">
      <Heading
        title="Welcome - Rateio"
        description="Create your Rateio! Save it at your account and share!"
        icon={SplitIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
    </div>
  );
};

export default DashboardHomePage;
