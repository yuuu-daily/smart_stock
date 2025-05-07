import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
  // resolve: name => {
  //   const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
  //   return pages[`./Pages/${name}.tsx`];
  // },
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });

        return (
            pages[`./Pages/${name}.tsx`] ||
            pages[`./Pages/${name}/index.tsx`] ||
            pages[`./Pages/${name}/${name.split('/').pop()}.tsx`]
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

