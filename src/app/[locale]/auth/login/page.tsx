import { JwtLoginView } from "@/sections/auth/jwt";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Barq Daily: Login",
};

export default function LoginPage() {
  return <JwtLoginView />;
}
