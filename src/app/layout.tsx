import type { Metadata } from "next";
import "./globals.css";
import Header from './userComponents/header';
import SessionProviderWrapper from "./wrappers/SessionWrapper";

export const metadata: Metadata = {
  title: "Code Guard - Manage your projects with ease and precision",
  description: "Secure storage for code, protecting it from unauthorized access across teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body className={`antialiased bg-gray-900 text-white`}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="px-6 h-max">{children}</main>
          </div>
        </body>
      </SessionProviderWrapper>
    </html>
  );
}