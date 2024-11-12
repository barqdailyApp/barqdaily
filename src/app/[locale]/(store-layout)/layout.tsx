import StoreLayout from "@/layouts/store";

export default async function Layout({
  children,
  modal,
  initcart,
  noguest,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  initcart: React.ReactNode;
  noguest: React.ReactNode;
}) {
  return (
    <StoreLayout>
      {children}
      {modal}
      {initcart}
      {noguest}
    </StoreLayout>
  );
}
