import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MyProvider } from "@/context/ProviderToken";
import { Navbar } from "@/components/Navbar";
// import { useEffect } from "react";
// import { useToken } from "@/hooks/useToken";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { getCookie } = useToken()
  // useEffect(() => {
  //   getCookie();
  // }, [])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MyProvider>
          <main id="ROOT">
            <Navbar />
            <div>
              {children}
            </div>
          </main>
        </MyProvider>
      </body>
    </html>
  );
}
