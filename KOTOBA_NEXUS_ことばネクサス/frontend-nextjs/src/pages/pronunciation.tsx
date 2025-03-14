import { Suspense } from "react";
import PronunciationPractice from "@/components/pronunciation/pronunciation-practice";
import Loading from "./loading";

export const metadata = {
  title: "Pronunciation Practice | Nihongo AI",
  description: "Improve your Japanese pronunciation with AI feedback",
};

export default function PronunciationPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pronunciation Practice</h1>
      <Suspense fallback={<Loading />}>
        <PronunciationPractice />
      </Suspense>
    </main>
  );
}
