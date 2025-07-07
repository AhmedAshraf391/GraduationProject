'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function withAuth(WrappedComponent) {
    return function ProtectedRoute(props) {
        const { user, loading } = useAuth();
        const router = useRouter();
        const pathname = usePathname();
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true); // Ensure effect runs only on client
            if (!loading && !user && isMounted) {
                console.log(`withAuth: Redirecting unauthenticated user from ${pathname} to /`);
                router.push(`/?redirect=${encodeURIComponent(pathname)}`);
            }
        }, [loading, user, router, pathname, isMounted]);

        // Avoid rendering during SSR or before hydration
        if (!isMounted || loading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
            );
        }

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}

export function withoutAuth(WrappedComponent) {
    return function PublicRoute(props) {
        const { user, loading } = useAuth();
        const router = useRouter();
        const pathname = usePathname();
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
            if (!loading && user && isMounted) {
                console.log(`withoutAuth: Redirecting authenticated user from ${pathname} to /home`);
                router.push('/home');
            }
        }, [loading, user, router, pathname, isMounted]);

        if (!isMounted || loading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
            );
        }

        if (user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}