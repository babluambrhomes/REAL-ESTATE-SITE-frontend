import { Poppins } from "next/font/google";
import { Providers } from "@/lib/providers";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
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
      className={`${poppins.variable} h-full antialiased bg-white`}
    >


      <body className="min-h-full font-poppins bg-white text-slate-900">
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
