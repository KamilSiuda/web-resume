import { alpha, Components, createTheme, LinkProps, Palette } from '@mui/material';
import { LinkBehavior } from './enhancers/LinkBehavior';
import { typography } from './typography';

const defaultTheme = createTheme({});

export const components = (palette: Palette, darkMode?: boolean): Components => ({
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                background: `radial-gradient(at left, ${alpha(darkMode ? palette.secondary.main : palette.primary.main, 0.7)}, ${alpha(palette.background.default, 0)} 50%),` +
                            `radial-gradient(at left, ${alpha(darkMode ? palette.primary.light : palette.secondary.light, 0.8)}, ${alpha(palette.background.default, 0)} 55%) ${palette.background.default}`,
                backgroundPosition: 'top -250px left, top -600px left',
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: '50% 110%, 70% 150%',
            },
            '*': { scrollbarWidth: 'thin', scrollbarColor: `${defaultTheme.palette.grey[800]}` },
            '*::-webkit-scrollbar': {
                width: '.5rem',
                background: 'transparent'
            },
            '*::-webkit-scrollbar-thumb': {
                borderRadius: 2,
                background: `${defaultTheme.palette.grey[300]}`
            },
            scrollbarWidth: 'thin',
        },
    },
    MuiAppBar: { styleOverrides: { root: { color: defaultTheme.palette.grey[900] } } },
    MuiLink: { defaultProps: { component: LinkBehavior } as LinkProps },
    MuiButtonBase: { defaultProps: { LinkComponent: LinkBehavior } },
    MuiChip: {
        variants: [
            {
                props: { variant: 'filled' },
                style: { background: palette.secondary.light, color: palette.secondary.contrastText },
            },
            {
                props: { variant: 'outlined' },
                style: { borderWidth: 2, borderColor: palette.secondary.light }
            }
        ],
        styleOverrides: {
            sizeMedium: {
                height: 32, paddingLeft: 0, paddingRight: 0, fontSize: typography.caption.fontSize
            },
            sizeSmall: {
                fontWeight: 500, padding: 6, fontSize: typography.caption.fontSize
            }
        }
    },
    MuiDivider: { styleOverrides: { root: { borderColor: alpha(palette.secondary.main, 0.4) } } }
});
