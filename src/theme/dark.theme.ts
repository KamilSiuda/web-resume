import { createTheme } from '@mui/material';
import { shape } from './common';
import { components } from './components';
import { darkPalette } from './palette';
import { typography } from './typography';

export const darkTheme = createTheme({
    components: components(darkPalette, true), palette: darkPalette, typography, shape
});
