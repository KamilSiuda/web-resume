import React from 'react';
import { Box, styled, SxProps, Theme } from '@mui/material';
import { APP_BAR_HEIGHT_DESKTOP } from 'theme/constants';

export const Page = styled(Box)(({ theme }) => ({
    height: '100vh',
    scrollSnapAlign: 'start'
}));

export const PageContent = styled(Box)(({ theme }) => ({
    maxWidth: '1440px',
    margin: '0 auto',
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        height: `calc(100%-${theme.spacing(5)}px)`,
    },
    paddingTop: `calc(${APP_BAR_HEIGHT_DESKTOP}px + ${theme.spacing(12)})`,
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    height: `calc(100%-calc(${APP_BAR_HEIGHT_DESKTOP}px + ${theme.spacing(12)}))`,
}));

type PageWrapperProps = { pageContentSx?: SxProps<Theme> };
export const PageWrapper = <TProps extends PageWrapperProps, >(Wrapped: React.ComponentType<Omit<TProps, keyof PageWrapperProps>>) => {
    return function ({ pageContentSx, ...restProps }: TProps) {
        return <Page><PageContent sx={pageContentSx}>
            <Wrapped {...restProps} />
        </PageContent></Page>;
    };
};
