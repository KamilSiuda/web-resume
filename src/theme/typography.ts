import createTypography from '@mui/material/styles/createTypography';
import { palette } from './palette';

export const typography = createTypography(palette, palette => ({ fontFamily: 'Poppins' }));
