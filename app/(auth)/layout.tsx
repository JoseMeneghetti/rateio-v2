import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/options";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const data = await getServerSession(AuthOptions);

  if (data) {
    redirect("/");
  }
  return (
    <div className="h-[100dvh] relative flex flex-grow">
      <main className="w-full">{children}</main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
