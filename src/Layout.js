import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        marginTop: theme.spacing(1),
        textAlign: 'right'
    },
    grid: {
        marginTop: theme.spacing(1)
    },
    button: {
        minHeight: "50px"
    }
}));

function createGrid(props, classes, value, setter) {
    let componentGrid = {
        normalGrid: [],
        scientificGrid: []
    };

    props.grid["normalGrid"].forEach(
        ({rowKey, elements}) =>
            componentGrid["normalGrid"].push(
                <Grid container key={rowKey} spacing={1}>
                  {elements.map(
                      ({key, label, type}) =>
                          <Grid item xs key={key} className={classes.grid}>
                            <Button
                              fullWidth
                              className={classes.button}
                              onClick={() => setter(props.callback({key, label, type}, value))}
                              variant={type == "function" ? "outlined" : "contained"}
                              color={type == "input" ? "primary" : "secondary"}>
                              {label}
                            </Button>
                          </Grid>)}
                </Grid>
          ));

    props.grid["scientificGrid"].forEach(
        ({rowKey, elements}) =>
            componentGrid["scientificGrid"].push(
                <Grid container key={rowKey} spacing={1}>
                  {elements.map(
                      ({key, label, type}) =>
                          <Grid item xs key={key} className={classes.grid}>
                            <Button
                              fullWidth
                              className={classes.button}
                              onClick={() => setter(props.callback({key, label, type}, value))}
                              variant={type == "function" ? "outlined" : "contained"}
                              color={type == "input" ? "primary" : "secondary"}>
                              {label}
                            </Button>
                          </Grid>)}
                </Grid>
            ));
    return componentGrid;
}

function Layout(props) {
    const [input, setInput] = useState("");
    const [scientific, setScientific] = useState(false);
    const classes = useStyles();

    const componentGrid = createGrid(props, classes, input, setInput);

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Scientific Calculator
            </Typography>
          </div>
          <input className={classes.input} value={input} readOnly/>
          <Grid container>
            <Grid item xs>
              <FormControlLabel
                control={<Switch
                           checked={scientific}
                           onChange={() =>
                                     scientific ? setScientific(false) : setScientific(true)}/>}
                label={<Typography variant="body2" color="textSecondary">
                         Toggle Scientific
                       </Typography>}/>

            </Grid>
          </Grid>
          {componentGrid["normalGrid"]}
          <Collapse in={scientific}>
            {componentGrid["scientificGrid"]}
          </Collapse>
        </Container>
    );
}

export default Layout;
