// import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });

        return (
            pages[`./Pages/${name}.tsx`] ||
            pages[`./Pages/${name}/index.tsx`] ||
            pages[`./Pages/${name}/${name.split('/').pop()}.tsx`]
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <App {...props} />
                <ToastContainer position="bottom-right" autoClose={3000} />
            </>
        );
    },
});
