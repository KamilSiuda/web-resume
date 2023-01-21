import React from 'react';
import { AppBar, Box, Button, Container, CSSObject, IconButton, styled, Switch, Theme, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePages } from 'hooks/usePages';
import { AppDrawer } from './AppDrawer';
import { APP_BAR_HEIGHT_DESKTOP, APP_BAR_HEIGHT_MOBILE } from 'theme/constants';
import { matchRoutes, useLocation } from 'react-router-dom';
import { useContrastMode } from 'hooks/useContrastMode';
import { config } from 'config';

export const headerMixin = (theme: Theme): CSSObject => ({
    [theme.breakpoints.down('sm')]: { height: APP_BAR_HEIGHT_MOBILE },
    height: APP_BAR_HEIGHT_DESKTOP,
});

const NavButton = styled(Button)<{selected: boolean}>(({ theme, selected }) => ({
    my: 2,
    display: 'block',
    paddingRight: 10,
    paddingLeft: 10,
    margin: 1,
    textTransform: 'capitalize',
    ...theme.typography.body1,
    ...(selected ? { fontWeight: 700, color: theme.palette.secondary.main } : {})
}));

type AppNavigationProps = {
    menuOpen: boolean;
    onOpenMenu: () => void;
    onCloseMenu: () => void
};

export const AppNavigation: React.FC<AppNavigationProps> = ({ menuOpen, onOpenMenu, onCloseMenu }) => {
    const pages = usePages();
    const location = useLocation();
    const { mode: contrastMode, toggle: toggleContrastMode } = useContrastMode();

    return <><AppBar position='absolute' color='transparent' elevation={0} sx={theme => ({
        width: '100%', top: 0, justifyContent: 'flex-end', ...headerMixin(theme)
    })}>
        <Container maxWidth="xl" sx={{
            display: 'flex', flex: 1, alignItems: 'flex-end'
        }}>
            <Toolbar disableGutters sx={{
                display: 'flex', flex: 1, flexDirection: { xs: 'row', sm: 'row' }, justifyContent: 'space-between'
            }}>
                <Box sx={{
                    display: {
                        xs: 'none', sm: 'flex', alignItems: 'center'
                    }
                }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={theme => ({
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: theme.palette.getContrastText(theme.palette.background.default),
                            textDecoration: 'none',
                        })}
                    >
                        <Typography textTransform='uppercase'>💻 {config.appName}</Typography>
                    </Typography>
                </Box>
                <Box sx={{
                    flexGrow: 1,
                    display: {
                        xs: 'flex', sm: 'none', color: 'inherit'
                    }
                }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        sx={theme => ({ color: theme.palette.getContrastText(theme.palette.background.default) })}
                        onClick={onOpenMenu}
                    >
                        <MenuIcon color='inherit' />
                    </IconButton>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={theme => ({
                        mr: 2,
                        display: { xs: 'flex', sm: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: theme.palette.getContrastText(theme.palette.background.default),
                        textDecoration: 'none',
                    })}
                >
                    <Typography textTransform='uppercase'>💻 {config.appName}</Typography>
                </Typography>
                <Box sx={{
                    flexGrow: 1,
                    alignItems: 'center',
                    display: {
                        xs: 'none', justifyContent: 'flex-end', sm: 'flex'
                    }
                }}>
                    {pages.filter(p => p.showMenu).map((page) => {
                        const selected = Boolean(matchRoutes([{ path: page.path }], location));

                        return <NavButton
                            key={page.name}
                            selected={selected}
                            color={selected ? 'secondary' : 'primary'}
                            size='large'
                            href={page.path}
                            onClick={onCloseMenu}
                        >
                            {page.name}
                        </NavButton>;
                    })}
                    {contrastMode === 'bright'
                        ? <span role="img" aria-label="bright mode">🌞</span>
                        : <span role="img" aria-label="dark mode">🌒</span>}
                    <Switch value={contrastMode === 'dark'} title={contrastMode === 'dark' ? 'Switch to bright mode' : 'Switch to dark mode'} onClick={toggleContrastMode} />
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    <AppDrawer isOpen={menuOpen} onClose={onCloseMenu} />
    </>;
};
