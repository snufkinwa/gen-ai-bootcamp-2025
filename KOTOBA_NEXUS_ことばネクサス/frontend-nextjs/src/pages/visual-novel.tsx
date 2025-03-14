import { Suspense } from "react";
import VisualNovelComponent from "@/components/visual-novel/visual-novel";
import Loading from "./loading";

export const metadata = {
  title: "Visual Novel | Nihongo AI",
  description: "Practice Japanese in an interactive visual novel",
};

export default function VisualNovelPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Japanese Visual Novel</h1>
      <Suspense fallback={<Loading />}>
        <VisualNovelComponent />
      </Suspense>
    </main>
  );
}
