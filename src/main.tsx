import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import { store } from './data/store.js';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
