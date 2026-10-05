"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Link from "next/link";
import toast from "react-hot-toast";

import { PrimaryButton } from "@/components/button/PrimaryButton";
import { authApi } from "@/lib/features/auth/authApi";

export default function ContactUpdatePage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const inputBase =
        "h-10 w-full rounded-lg border mt-1 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

    const handleContinue = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            router.push("/");
            return;
        }

        setIsSaving(true);

        try {
            await authApi.updateContact({
                email: trimmedEmail,
            });

            toast.success("Email added successfully");
            router.push("/");
        } catch (error) {
            console.error("Failed to update email:", error);
            toast.error("Unable to add email. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSkip = () => {
        router.push("/");
    };

    return (
        <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:items-center">
            <button
                type="button"
                onClick={handleSkip}
                className="absolute right-6 top-6 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:border-gray-900 hover:bg-black hover:text-white hover:shadow-md"
            >
                Skip
            </button>
            {/* Left Image */}
            <div className="hidden w-full max-w-md lg:block">
                <Image
                    src="/auth/register.png"
                    alt="Roofin contact update"
                    width={600}
                    height={600}
                    className="h-auto w-full object-contain"
                />
            </div>

            {/* Card */}
            <div>
                <div className="w-full max-w-md bg-white p-6 sm:p-8">
                    <div className="mb-6 text-left">
                        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 [font-family:var(--font-playfair)]">
                            Add your email
                        </h1>

                        <p className="mt-1.5 text-[12px] text-black">
                            Add your email to keep your Roofin account connected and secure.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-900"
                            >
                                Email <span className="text-gray-500">(Optional)</span>
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                className={inputBase}
                            />
                        </div>

                        <PrimaryButton
                            type="button"
                            pending={isSaving}
                            pendingLabel="Saving..."
                            onClick={handleContinue}
                        >
                            Continue
                        </PrimaryButton>

                        {/* <button
                            type="button"
                            onClick={handleSkip}
                            className="w-full text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                        >
                            Skip for now
                        </button> */}
                    </div>
                </div>

                {/* <p className="mt-6 text-center text-base text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:text-primary/80"
                    >
                        Sign in
                    </Link>
                </p> */}
            </div>
        </div>
    );
}