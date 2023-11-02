import NavBar from "@/components/create-rateio/navbar";
import Sidebar from "@/components/create-rateio/sidebar";
import { redirect } from "next/navigation";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen relative flex flex-grow">
      <div className="hidden md:flex h-full md:w-80 md:flex-col md:inset-y-0 bg-gray-900">
        <Sidebar />
      </div>
      <main className="w-full">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
