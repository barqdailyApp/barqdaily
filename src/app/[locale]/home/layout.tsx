import AuthGuard from "@/auth/guard/auth-guard";
import DashboardLayout from "@/layouts/dashboard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
