import { Suspense } from "react";
import LawyersClient from "@/components/LawyersClient";

export default function LawyersPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <LawyersClient />
    </Suspense>
  );
}
