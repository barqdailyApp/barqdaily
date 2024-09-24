import StoreLayout from "@/layouts/store";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StoreLayout>{children}</StoreLayout>;
}
