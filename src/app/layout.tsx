import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeIntel AI",
  description: "AI-driven craftsmanship triage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
