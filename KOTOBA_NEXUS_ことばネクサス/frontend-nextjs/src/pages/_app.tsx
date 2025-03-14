import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LandingLayout from "@/components/landing-layout";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Check if we're on the landing page
  const isLandingPage = router.pathname === "/";
  const isLoginPage = router.pathname === "/login";
  const isSignupPage = router.pathname === "/signup";

  // Use landing layout for the home page only
  if (isLandingPage) {
    return (
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>
    );
  }

  if (isLoginPage || isSignupPage) {
    return (
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    );
  }

  // Use normal layout with navbar for other pages
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
