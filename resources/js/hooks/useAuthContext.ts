// resources/js/hooks/useAuthContext.ts

import { usePage } from '@inertiajs/react';

export const useAuthContext = () => {
    const { auth } = usePage().props as { auth?: { user?: { id: number; name: string } } };

    return {
        isAuthenticated: !!auth?.user,
        user: auth?.user,
    };
};
