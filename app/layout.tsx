import type { Metadata } from "next";

import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ClerkProvider } from "@clerk/nextjs";
import { SignedIn, SignedOut } from '@clerk/nextjs'

import SignedNav from "@/components/nav/SignedNav";
import DefaultNav from "@/components/nav/DefaultNav";

export const metadata: Metadata = {
  title: "Flashcard SaaS",
  description: "Create flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedIn>
            <SignedNav/>
          </SignedIn>
          <SignedOut>
            <DefaultNav/>
          </SignedOut>

          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
