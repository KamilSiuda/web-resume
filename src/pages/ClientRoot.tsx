import React, { PropsWithChildren, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useDeviceDetect } from 'hooks/useDeviceDetect';
import { AppNavigation } from 'layout/AppNavigation';

const BodyContainer = styled(Box, { shouldForwardProp: prop => prop !== 'isMenuOpen' })<{isMenuOpen: boolean}>(({ theme, isMenuOpen }) => ({
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('sm')]: { paddingTop: '56px' },
    ...(isMenuOpen && {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const ClientRoot: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const { isMobile } = useDeviceDetect();
    const [isMenuOpen, setMenuOpen] = useState(!isMobile);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    return <>
        <AppNavigation menuOpen={isMenuOpen} onCloseMenu={closeMenu} onOpenMenu={openMenu} />
        <BodyContainer component='main' isMenuOpen={isMenuOpen}>
            {children}
        </BodyContainer>
    </>;
};
