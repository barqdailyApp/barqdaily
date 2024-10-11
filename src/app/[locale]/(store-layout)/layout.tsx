import StoreLayout from "@/layouts/store";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <StoreLayout>
      {children}
      {modal}
    </StoreLayout>
  );
}
