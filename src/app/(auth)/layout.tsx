'use client'
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const PAGE_NAMES: Record<string, string> = {
  "/register": "Register",
  "/login": "Sign In",
  "/forgot-password": "Forgot Password",
  "/reset-password": "Reset Password",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const Router = useRouter()
  const pathname = usePathname()
  const pageName = PAGE_NAMES[pathname] ?? "Auth"


  return (
    <div className=" min-h-screen w-full bg-gray-50 px-4 pt-6 pb-16 sm:px-6 lg:px-8" style={{
      backgroundImage: "url('/auth/auth_banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <header className=" px-10  ">
        <div className="bg-white py-3 px-5 rounded-full shadow-2xl justify-between flex gap-4 items-center ">
          <div className="flex items-center gap-4">
            <Image
              src="/layout/logo.png"
              alt="AmbrHomes"
              width={80}
              sizes="(max-width: 768px) 100vw, 33vw"
              height={50}
            />
          </div>
          <div className="flex gap-6 text-sm items-center">
            <span className="text-black text-sm">
              {pageName}
            </span>
            <button onClick={() => Router.back()} className="bg-black text-white text-sm font-normal inline-block px-5 py-1 rounded-4xl">
              Skip
            </button>
          </div>
        </div>
      </header>
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
