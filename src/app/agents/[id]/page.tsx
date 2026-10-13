import { redirect } from "next/navigation";

export default async function DynamicAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/s/agent/${id}`);
}
