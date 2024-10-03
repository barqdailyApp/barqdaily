type Props = Record<
  "children" | "banars" | "filters" | "offers",
  React.ReactNode
>;

export default function Layout({ children, banars, filters, offers }: Props) {
  return (
    <>
      {banars} {filters} {offers} {children}
    </>
  );
}
