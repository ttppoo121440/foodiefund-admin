import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
// import { makeServer } from '@/mocks/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

const queryClient = new QueryClient();

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
);
