import StoreLayout from "@/layouts/store";

export default async function Layout({
  children,
  initcart,
  noguest,
}: {
  children: React.ReactNode;
  initcart: React.ReactNode;
  noguest: React.ReactNode;
}) {
  return (
    <StoreLayout>
      {children}
      {initcart}
      {noguest}
    </StoreLayout>
  );
}
