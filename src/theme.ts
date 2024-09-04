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
      fontSize: '1rem', // Large for major headers
      fontWeight: 700,
      textAlign: 'center',
      color: '#ffd700',
    },
    h2: {
      fontFamily: `'Star Jedi', Arial, sans-serif`,
      fontSize: '15rem', // Subheader size
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
      fontFamily: `'Star Jedi', Arial, sans-serif`, // Reserved for smaller headers like the nav title
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#ffd700',
    },
    // title of table page
    body1: {
      fontSize: '1.5rem', // Standard readable size for main text
      fontFamily: `'Star Jedi', Arial, sans-serif`,
    },
    // cells of table page
    body2: {
      fontSize: '0.875rem', // Slightly smaller text, used for footer or less important text
      fontFamily: `'Orbitron', Arial, sans-serif`,
      fontWeight: 600,
    },
    button: {
      fontSize: '1rem', // Matches body1 for readability
      fontFamily: `'Orbitron', Arial, sans-serif`,
      fontWeight: 700,
    },
    // resource lists
    subtitle1: {
      fontFamily: `'Orbitron', Arial, sans-serif`,
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
            color: '#b0c4de', // Custom color for 'inherit' buttons
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
