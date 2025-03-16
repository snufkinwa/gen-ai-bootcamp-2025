import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LandingLayout from "@/components/landing-layout";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CharacterPopup from "@/components/character-popup";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Prevent popup from resetting every page change
    const handleRouteChange = () => setShowPopup(false);
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", () => setShowPopup(true));

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", () => setShowPopup(true));
    };
  }, [router.events]);

  const isLandingPage = router.pathname === "/";
  const isLoginPage = router.pathname === "/login";
  const isSignupPage = router.pathname === "/signup";

  if (isLandingPage) {
    return (
      <LandingLayout>
        <Component {...pageProps} />
        {/* No popup on landing page */}
      </LandingLayout>
    );
  }

  if (isLoginPage || isSignupPage) {
    return (
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
          {/* No popup on login/signup pages */}
        </ThemeProvider>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex">
          <Navbar />
          <main className="flex-grow min-h-screen">
            <Component {...pageProps} />
          </main>
        </div>

        {/*  Character Popup is included only on relevant pages */}
        {showPopup && <CharacterPopup />}
      </ThemeProvider>
    </AuthProvider>
  );
}
