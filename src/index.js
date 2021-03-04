import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#5381ac",
        },
        secondary: {
            main: "#8fbcbb"
        },
        type: "dark",
        background: {
            default: "#2e3440",
        },
        text: {
            primary: "#eceff4",
            secondary: "#d8dee9"
        }
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
    document.getElementById('app'));
