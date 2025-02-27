import { Header, Sidebar } from "@/components/shared";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Eraser.io",
  description: "Dashboard for Eraser.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <Separator />
        <div className="overflow-auto">
          <div className="container max-md:px-2 flex-1 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
