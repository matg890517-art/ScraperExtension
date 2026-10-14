
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B7CFF',
      light: '#B2A9FF',
      dark: '#6757E8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#42C8C4',
    },
    background: {
      default: '#101218',
      paper: '#191C25',
    },
    text: {
      primary: '#F1F2F7',
      secondary: '#9BA3B7',
    },
    divider: '#2C3140',
    success: {
      main: '#45C486',
    },
    error: {
      main: '#FF647C',
    },
    warning: {
      main: '#F5B85C',
    },
    info: {
      main: '#66B5FF',
    },
  },

  typography: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h6: {
      fontSize: '1.05rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    subtitle1: {
      fontSize: '0.95rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.75rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 10,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          minWidth: 320,
        },
        body: {
          margin: 0,
          minWidth: 320,
          minHeight: '100vh',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 10,
          padding: '9px 14px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #8B7CFF, #7162F3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9A8DFF, #8173FF)',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
        },
        outlined: {
          borderColor: '#2C3140',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          height: 25,
          borderRadius: 7,
          fontWeight: 600,
          fontSize: '0.72rem',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 9,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#34394A',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#666D83',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8B7CFF',
          },
        },
      },
    },
  },
});

export default theme;
