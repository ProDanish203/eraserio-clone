import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document | Eraser.io",
  description: "Document",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative">{children}</div>;
}
