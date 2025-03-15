import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/store/ReactQueryProvider";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Eraser.io clone",
  description:
    "A clone of Eraser.io, your personal whiteboard. Adding the feature of managing your notes and documents as well.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", poppins.className, roboto.variable)}>
        <ReactQueryProvider>
          <Toaster richColors position="top-right" />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
