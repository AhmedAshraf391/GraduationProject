import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(WrappedComponent) {
    return function ProtectedRoute(props) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push('/');
            }
        }, [loading, user, router]);

        if (loading) {
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

        useEffect(() => {
            if (!loading && user) {
                router.push('/home');
            }
        }, [loading, user, router]);

        if (loading) {
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