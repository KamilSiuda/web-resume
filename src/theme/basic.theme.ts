import { createTheme } from '@mui/material';
import { shape } from './common';
import { components } from './components';
import { palette } from './palette';
import { typography } from './typography';

export const basicTheme = createTheme({
    components: components(palette), palette, typography, shape
});
