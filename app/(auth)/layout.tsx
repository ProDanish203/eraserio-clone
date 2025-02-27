import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | Eraser.io",
  description: "Login to your account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col md:flex-row md:min-h-screen">
      {/* Left Section */}
      <div className="flex-1 relative hidden md:block">
        <Image
          src="/images/auth.jpg"
          alt="Authentication"
          width={1500}
          height={1500}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-bg p-4 sm:p-8 md:p-16 min-h-screen">
        {children}
      </div>
    </main>
  );
}
