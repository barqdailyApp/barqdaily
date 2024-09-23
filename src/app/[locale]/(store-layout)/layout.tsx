import CompactLayout from "@/layouts/compact";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompactLayout>{children}</CompactLayout>;
}
