import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthOptions } from "../api/auth/[...nextauth]/options";
import Header from "@/components/header/header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const data = await getServerSession(AuthOptions);

  if (!data) {
    debugger;
    redirect("/");
  }

  return (
    <div>
      <Header />
      <div className="h-[100dvh] relative flex flex-grow">
        <main className="w-full">{children}</main>
        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
