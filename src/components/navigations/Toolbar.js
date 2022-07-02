import React from 'react'
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import {makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [
        theme.breakpoints.up('sm')]: {
          display: 'block',
      },
    },
  }));


function ToolBar() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
        GA
        </Typography>
        <Link to='/'>
            <Button size='medium' variant="contained" color="secondary"> Menu </Button>
            </Link>
      </Toolbar>
    </AppBar>
  </div>
  )
}

export default ToolBar