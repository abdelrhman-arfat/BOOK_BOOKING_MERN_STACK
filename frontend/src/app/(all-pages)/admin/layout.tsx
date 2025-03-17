import SideBar from "@/app/_components/sidebar/SideBar";
import IfNotFromAdmins from "@/app/_components/ui/IfNotFromAdmins";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen flex md:gap-4 items-center ">
      <IfNotFromAdmins />
      <aside className="bg-green-50 md:w-[190px]">
        <SideBar />
      </aside>
      <div className="md:px-4 py-1 w-full ">{children}</div>
    </main>
  );
}
