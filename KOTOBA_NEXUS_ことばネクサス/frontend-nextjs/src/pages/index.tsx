import { Suspense } from "react";
import Hero from "@/components/hero";
import FeaturesSection from "@/components/features-section";
import Loading from "./loading";
import { Nunito } from "next/font/google";
import CharacterSection from "@/components/character-section";
import BlogSection from "@/components/blog-section";
import CallToActionSection from "@/components/cta-section";
import Head from "next/head";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  return (
    <div
      className={`${nunito.variable} flex flex-col items-center overflow-x-hidden min-h-screen`}
    >
      <Head>
        <title>ことば ❀·˚ ༘ ネクサス</title>
        <meta
          name="description"
          content="Master Japanese through AI-powered interactive lessons with kana writing, pronunciation practice, and immersive conversations."
        />
      </Head>
      <main className="w-full">
        <Suspense fallback={<Loading />}>
          <Hero />
          <CharacterSection />
          <FeaturesSection />
          <BlogSection />
          <CallToActionSection />
        </Suspense>
      </main>
    </div>
  );
}
