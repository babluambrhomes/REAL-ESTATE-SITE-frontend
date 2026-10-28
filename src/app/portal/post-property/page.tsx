"use client";

import { useRouter } from "next/navigation";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { PortalPostProperty } from "@/components/portal/PortalPostProperty";

export default function PortalPostPropertyPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PortalHeader />
      <PortalPostProperty
        onCancel={() => router.push("/portal")}
        onComplete={() => router.push("/portal")}
      />
    </div>
  );
}
