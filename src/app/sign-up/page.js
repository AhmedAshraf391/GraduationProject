'use client';
import dynamic from 'next/dynamic';

const Signup = dynamic(() => import('@/components/Signup'), { ssr: false });

export default function SignUpPage() {
  return <Signup />;
}
