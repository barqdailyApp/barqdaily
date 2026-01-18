type Props = Record<
  "children" | "banars" | "filters" | "offers" | "collections" | "orderagain",
  React.ReactNode
>;

export default function Layout({
  children,
  banars,
  filters,
  collections,
  offers,
  orderagain: orderAgain,
}: Props) {
  return (
    <>
      {banars} {filters} {collections} {offers} {orderAgain} {children}
    </>
  );
}
