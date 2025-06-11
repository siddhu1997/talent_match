import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TalentMatch",
  description: "Valhalla! A platform to match talent with opportunities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
