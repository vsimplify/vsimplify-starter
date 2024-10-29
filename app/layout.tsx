import React from 'react';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import Providers from "@/components/Providers"; // Import the new Providers component

export const metadata = {
  title: "Meet your goals with the help of AI. ",
  description: "Deploy intelligent AI agents in seconds to accomplish any task",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <section>
          <Suspense
            fallback={
              <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between h-[69px]" />
            }
          >
            <Navbar />
          </Suspense>
        </section>
        <main className="flex flex-1 flex-col items-center">
          <Providers> {/* Wrap children with Providers */}
            {children}
          </Providers>
        </main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
