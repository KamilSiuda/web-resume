import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { MainView } from './layout/MainView';
import { Routes } from './routing/Routes';
import { basicTheme } from 'theme/basic.theme';
import { FirebaseContextProvider } from 'providers/FirebaseProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClientRoot } from 'pages/ClientRoot';
import { useContrastMode } from 'hooks/useContrastMode';
import { darkTheme } from 'theme/dark.theme';
import { CustomSnackbarProvider } from 'providers/SnackbarProvider';
import { useFirebaseAnonymousAuth } from 'hooks/useFirebaseAnonymousAuth';
import { AppStatus } from 'models/AppStatus';

const queryClient = new QueryClient({ defaultOptions: { queries: { suspense: false } } });

function App () {
    const { error } = useFirebaseAnonymousAuth();
    const { mode } = useContrastMode();

    const appStatus = useMemo((): AppStatus | undefined =>
        error ? { message: error, severity: 'error' } : undefined, [error]);
    return <ThemeProvider theme={mode === 'bright' ? basicTheme : darkTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
            <FirebaseContextProvider>
                <CustomSnackbarProvider>
                    <MainView appStatus={appStatus}>
                        <ClientRoot>
                            <Routes />
                        </ClientRoot>
                    </MainView>
                </CustomSnackbarProvider>
            </FirebaseContextProvider>
        </QueryClientProvider>
    </ThemeProvider>;
}

export default App;
