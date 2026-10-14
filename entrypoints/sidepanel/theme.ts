import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter: string;
    darker: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      lighter: '#C8FAD6',
      light: '#5BE49B',
      main: '#00A76F',
      dark: '#007867',
      darker: '#004B50',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#EFD6FF',
      light: '#C684FF',
      main: '#8E33FF',
      dark: '#5119B7',
      darker: '#27097A',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#CAFDF5',
      light: '#61F3F3',
      main: '#00B8D9',
      dark: '#006C9C',
      darker: '#003768',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#D3FCD2',
      light: '#77ED8B',
      main: '#22C55E',
      dark: '#118D57',
      darker: '#065E49',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FFF5CC',
      light: '#FFD666',
      main: '#FFAB00',
      dark: '#B76E00',
      darker: '#7A4100',
      contrastText: '#1C252E',
    },
    error: {
      lighter: '#FFE9D5',
      light: '#FFAC82',
      main: '#FF5630',
      dark: '#B71D18',
      darker: '#7A0916',
      contrastText: '#FFFFFF',
    },
    grey: {
      50: '#FCFDFD',
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#1C252E',
      900: '#141A21',
    },
    common: { black: '#000000', white: '#FFFFFF' },
    background: {
      default: '#141A21',
      paper: '#1C252E',
    },
    text: {
      primary: '#F4F6F8',
      secondary: '#919EAB',
      disabled: '#637381',
    },
    divider: 'rgba(145, 158, 171, 0.20)',
    action: {
      hover: 'rgba(145, 158, 171, 0.08)',
      selected: 'rgba(145, 158, 171, 0.16)',
      focus: 'rgba(145, 158, 171, 0.24)',
      disabled: 'rgba(145, 158, 171, 0.48)',
      disabledBackground: 'rgba(145, 158, 171, 0.24)',
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  },
  typography: {
    fontFamily: '"Nunito Sans", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h6: { fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.55, letterSpacing: '-0.02em' },
    subtitle1: { fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.5 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.55 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.6 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          minWidth: 320,
          colorScheme: 'dark',
          fontSynthesis: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          margin: 0,
          minWidth: 320,
          minHeight: '100vh',
        },
        '#root': {
          width: '100%',
          minHeight: '100vh',
        },
        '*': { boxSizing: 'border-box' },
        button: { fontFamily: 'inherit' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 40, borderRadius: 8, padding: '9px 14px' },
        containedPrimary: ({ theme }) => ({
          '&:hover': { backgroundColor: theme.palette.primary.dark },
        }),
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none' },
        outlined: ({ theme }) => ({ borderColor: theme.palette.divider }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { height: 25, borderRadius: 7, fontWeight: 600, fontSize: '0.72rem' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.text.secondary },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main },
        }),
      },
    },
  },
});

export default theme;
