import { Suspense } from "react";
import KanaGameComponent from "@/components/kana-game/kana-game";
import Loading from "./loading";

export const metadata = {
  title: "Kana Writing Game | Nihongo AI",
  description: "Practice writing Japanese kana with AI feedback",
};

export default function KanaGamePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kana Writing Game</h1>
      <Suspense fallback={<Loading />}>
        <KanaGameComponent />
      </Suspense>
    </main>
  );
}
