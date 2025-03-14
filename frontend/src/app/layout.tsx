import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./_RTK/provider/AppProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Books Store",
  description: "Store with bookings and orders",
  authors: [
    {
      name: "Abdo Yasser",
      url: "https://github.com/abdelrhman-arfat/CRUD_Mern_stack/tree/main/frontend",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${roboto.variable} w-screen overflow-x-hidden antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
