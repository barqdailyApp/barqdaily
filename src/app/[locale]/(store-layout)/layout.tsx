import StoreLayout from "@/layouts/store";

export default async function Layout({
  children,
  modal,
  initcart,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  initcart: React.ReactNode;
}) {
  return (
    <StoreLayout>
      {children}
      {modal}
      {initcart}
    </StoreLayout>
  );
}
