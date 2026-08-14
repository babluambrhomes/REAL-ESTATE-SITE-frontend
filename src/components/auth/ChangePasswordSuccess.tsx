"use client";

import Link from "next/link";
import Image from "next/image";


export const ChangePasswordSuccess = () => {



  return (
    <div className="relative flex w-full flex-col-reverse items-center justify-center gap-20 lg:flex-row lg:items-center">
      <div className="hidden w-full max-w-md lg:block">
        <Image
          src="/auth/sucess1.png"
          alt="Roofin reset password"
          width={600}
          height={600}
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="w-full max-w-[350px] rounded-2xl border border-dashed border-black bg-white p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 [font-family:var(--font-playfair)]">
              Password Updated
            </h1>
            <p className="mt-1.5 text-[12px] text-black">
              Your Password has been updated!
            </p>
          </div>

          <Image
            src="/auth/sucess2.png"
            alt="Roofin reset password"
            width={600}
            height={600}
            className="h-auto w-full m-auto max-w-[200px] object-contain"
          />

          <Link href='/login' className="inline-flex w-full mt-4 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

            >
              Login Now
            </Link>
        </div>
    </div>
  );
}
