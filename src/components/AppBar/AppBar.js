import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolBar: {
    background: '#8e24aa',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: 'none',
  },
  appBar: {
    boxShadow: 'none',
  },
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePayments = () => {
    props.setPayments(true);
    setAnchorEl(null);
  };

  const handleCart = () => {
    props.setPayments(false);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Toolbar classes={{
          root: classes.toolBar,
        }}>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handlePayments}>My payments</MenuItem>
                <MenuItem onClick={handleCart}>Shopping Cart</MenuItem>
              </Menu>
            </div>
          )}
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => props.setPayments(false)}
            style={{ cursor: 'pointer' }}
          >
            Tech Providers - Cart
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div >
  );
}
