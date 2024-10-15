import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    primary: {
      main: '#ffd700',
    },
    secondary: {
      main: '#ff4500',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0c4de',
    },
  },
  typography: {
    fontFamily: `'Orbitron', Arial, sans-serif`,
    h1: {
      fontFamily: `'Star Jedi', Arial, sans-serif`,
      fontSize: '1rem',
      fontWeight: 700,
      textAlign: 'center',
      color: '#ffd700',
    },
    h2: {
      fontFamily: `'Star Jedi', Arial, sans-serif`,
      fontSize: '15rem',
      fontWeight: 600,
      color: '#ff4500',
    },
    h3: {
      fontFamily: `'Star Jedi', Arial, sans-serif`,
      fontSize: '1rem',
      fontWeight: 600,
      color: '#ffd700',
    },
    // star wars logo
    h6: {
      fontFamily: `'Star Jedi', Arial, sans-serif`,
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#ffd700',
    },
    // title of table page
    body1: {
      fontSize: '1.5rem',
      fontFamily: `'Star Jedi', Arial, sans-serif`,
    },
    // cells of table page
    body2: {
      fontSize: '0.875rem',
      fontFamily: `'Orbitron', Arial, sans-serif`,
      fontWeight: 600,
    },
    button: {
      fontSize: '1rem',
      fontFamily: `'Orbitron', Arial, sans-serif`,
      fontWeight: 700,
    },
    // resource lists
    subtitle1: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          '&.MuiButton-colorInherit': {
            color: '#b0c4de',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: `'Orbitron', Arial, sans-serif`,
          fontSize: '1rem',
          fontWeight: 700,
          color: '#b0c4de',
          '&:hover': {
            backgroundColor: '#ffd700',
            color: '#000000',
          },
          '&.Mui-selected': {
            backgroundColor: '#ff4500',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#ff4500',
              color: '#ffffff',
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
        },
      },
    },
  },
})

export default theme
