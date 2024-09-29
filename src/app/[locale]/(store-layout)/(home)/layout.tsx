type Props = Record<"children" | "banars" | "filters", React.ReactNode>;

export default function Layout({ children, banars, filters }: Props) {
  return (
    <>
      {banars} {filters} {children}
    </>
  );
}
