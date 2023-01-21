import React from 'react';
import { useTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';

export const CustomSnackbarProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const theme = useTheme();

    return <SnackbarProvider maxSnack={3} iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️',
    }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    autoHideDuration={7500}
    style={{ borderRadius: `${theme.shape.borderRadius}px` }}>
        {children}
    </SnackbarProvider>;
};
