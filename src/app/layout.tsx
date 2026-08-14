import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Providers } from "@/lib/providers";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AmbrHomes - Real Estate",
  description: "Find your perfect home with AmbrHomes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full ">
        <Providers>
   
          {children}
         
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
