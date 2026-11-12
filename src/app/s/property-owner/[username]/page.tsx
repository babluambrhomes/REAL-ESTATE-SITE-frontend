import { redirect } from "next/navigation";

export default async function PropertyOwnerProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  redirect(`/s/agent/${username || "jitender-singh"}`);
}
