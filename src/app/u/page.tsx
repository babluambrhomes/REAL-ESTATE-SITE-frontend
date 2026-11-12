import { Suspense } from "react";
import UserProfilePage from "./[id]/page";

export default function UserDefaultPage() {
  return (
    <Suspense fallback={null}>
      <UserProfilePage />
    </Suspense>
  );
}
