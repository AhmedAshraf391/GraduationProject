"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const VerifyOTP = dynamic(() => import("@/components/VerifyOTP"), {
	ssr: false, // prevent server-side rendering
});

export default function VerifyEmailPage() {
	return (
		<Suspense fallback={<div className="text-center py-20">Loading...</div>}>
			<VerifyOTP />
		</Suspense>
	);
}
