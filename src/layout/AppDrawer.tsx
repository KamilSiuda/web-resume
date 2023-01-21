import React from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Switch, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { usePages } from 'hooks/usePages';
import { Link } from 'react-router-dom';
import { config } from 'config';
import { useContrastMode } from 'hooks/useContrastMode';

export const AppDrawer: React.FC<{isOpen: boolean; onClose: () => void}> = ({ isOpen, onClose }) => {
    const pages = usePages();
    const { mode: contrastMode, toggle: toggleContrastMode } = useContrastMode();

    return <Drawer
        container={window.document.body}
        variant='temporary'
        anchor='top'
        open={isOpen}
        ModalProps={{ keepMounted: true }}
        sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box', width: '100%', height: '100%'
            },
        }}
        onClose={onClose}>
        <Box sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2
        }}>
            <Typography textTransform='uppercase' sx={{ fontFamily: 'monospace' }}>💻 {config.appName}</Typography>
            <IconButton color='inherit' onClick={onClose}>
                <CloseIcon color='inherit' />
            </IconButton>
        </Box>
        <List sx={{ flex: 1 }}>
            {pages.filter(p => p.showMenu).map(page => (<ListItem key={page.name}>
                <ListItemButton component={Link} to={page.path} onClick={onClose}><ListItemText primary={page.name} /></ListItemButton>
            </ListItem>
            ))}

        </List>
        <Box padding={2} display='flex' justifyContent='flex-end' alignItems='center'>
            {contrastMode === 'bright'
                ? <span role="img" aria-label="bright mode">🌞</span>
                : <span role="img" aria-label="dark mode">🌒</span>}
            <Switch value={contrastMode === 'dark'} title={contrastMode === 'dark' ? 'Switch to bright mode' : 'Switch to dark mode'} onClick={toggleContrastMode} />
        </Box>
    </Drawer>;
};
