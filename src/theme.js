import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand, sans-serif',
    },
  palette: {
    primary: {
      main: '#F1356D',
    },
    secondary: {
      main: '#35f1b9',
      text: '#757575',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;