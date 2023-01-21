import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

dayjs.extend(duration);

const baseUrl = '';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter basename={baseUrl}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
