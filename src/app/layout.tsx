import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
import { ReduxProvider } from "@/redux/slices/provider";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});


export const metadata: Metadata = {
  title: "DuckDuck",
  description: "Understand faster.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
       <html lang="en">
      <body
        className={`${manrope.variable} bg-[#171717]`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ReduxProvider>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>

   
  );
}
