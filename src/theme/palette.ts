import createPalette from '@mui/material/styles/createPalette';

const defaultPalette = createPalette({});

export const palette = createPalette({
    primary: { main: '#B33F62' },
    secondary: { main: '#548687' },
    text: { secondary: defaultPalette.grey[800] },
    background: { paper: '#fafbee', default: '#fafbee' },
});

export const darkPalette = createPalette({
    primary: { main: '#B33F62' },
    secondary: { main: '#548687' },
    text: { primary: defaultPalette.grey[100], secondary: defaultPalette.grey[300] },
    background: {
        default: '#1C1C1C',
        paper: '#1C1C1C'
    },
});
