import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './views/app/app';
import { ErrorBoundary } from 'react-error-boundary';
import { AppError } from './components/errors/appError';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    {/*<ErrorBoundary fallback={<AppError />}>*/}
      <App />
    {/*</ErrorBoundary>*/}
  </StrictMode>
);
