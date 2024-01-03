import NavBar from "@/components/common/navbar";
import Sidebar from "@/components/common/sidebar";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { getRateios } from "@/service/rateio/rateio-service";
import Header from "@/components/header/header";
import { Rateio } from "@prisma/client";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const getData = async (id: string): Promise<Rateio[]> => {
  try {
    const response = await getRateios(id);
    return response?.data;
  } catch (error: any) {
    console.error
    throw new Error(error.response?.data.message);
  }
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    redirect("/");
  }

  const rateios = await getData(session?.user.id);

  return (
    <div className="h-[100dvh] relative flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <div className="hidden md:flex h-full md:w-80 md:flex-col md:inset-y-0 bg-gray-900">
          <Sidebar rateios={rateios} />
        </div>
        <main className="w-full">
          <NavBar rateios={rateios} />
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
