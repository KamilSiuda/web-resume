import React, { PropsWithChildren, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { AppStatus } from 'models/AppStatus';

type MainViewProps = {
    appStatus?: AppStatus | undefined;
}
export const MainView: React.FC<PropsWithChildren<MainViewProps>> = ({ appStatus, children }) => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (appStatus) {
            enqueueSnackbar(appStatus.message, { variant: appStatus.severity });
        }
    }, [appStatus]);

    return <Box position='relative'>
        {children}
    </Box>;
};
