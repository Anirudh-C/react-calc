import React, { useState } from 'react';

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from "@material-ui/core/Switch";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 400,
        minHeight: 400,
    },
    title: {
        fontSize: 14,
    },
}));

export default function App() {
    const classes = useStyles();
    const [darkState, setDarkState] = useState(false);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#6272a4"
            },
            secondary: {
                main: "#bd93f9"
            }
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h4">
                Scientific Calculator
              </Typography>
              <CssBaseline />
              <Card className={classes.root} variant="outlined">
              </Card>
            </div>
          </Container>
        </ThemeProvider>
    );
}
