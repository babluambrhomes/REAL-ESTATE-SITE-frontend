import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Poppins, Playfair_Display, M_PLUS_Rounded_1c } from "next/font/google";
import { Providers } from "@/lib/providers";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const roundedMplus = M_PLUS_Rounded_1c({
  variable: "--font-rounded-mplus",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
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
      className={`${roundedMplus.variable} ${outfit.variable} ${plusJakarta.variable} ${poppins.variable} ${playfair.variable} h-full antialiased`}
    >


      <body className="min-h-full">
        <Providers>
          {children}
          <Footer />
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
