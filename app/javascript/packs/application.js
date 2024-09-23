import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../packs/App';

document.addEventListener('DOMContentLoaded', () => {
    const currentUserElement = document.getElementById('current-user');

    const currentUser = currentUserElement ? JSON.parse(currentUserElement.innerText) : null;

    const rootElement = document.getElementById('root');
    if (rootElement) {
        console.log('Root element found, rendering React app');
        createRoot(rootElement).render(
            <React.StrictMode>
                <App currentUser={currentUser} />
            </React.StrictMode>
        );
    } else {
        console.log('Root element not found');
    }
});
