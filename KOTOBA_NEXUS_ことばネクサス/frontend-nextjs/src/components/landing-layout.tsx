import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";
import { AuthProvider } from "@/lib/auth-context";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
