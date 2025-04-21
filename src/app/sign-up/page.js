'use client';
import dynamic from 'next/dynamic';

// ✅ دلوقتي المسار مضبوط
const Signup = dynamic(() => import('@/components/Signup'), { ssr: false });

export default function SignUpPage() {
  return <Signup />;
}
