import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import ToolBar from '@material-ui/core/ToolBar';
import { getSignedIn } from '../../reducks/users/selectors';
import logo from '../../assets/img/icons/logo.png';
import { push } from 'connected-react-router';
import { HeaderMenu, ClosableDrawer } from './index';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolbar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = useCallback(
    (event, isOpen) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.menuBar}>
        <ToolBar className={classes.toolBar}>
          <img src={logo} alt='ロゴ' width='48px' onClick={() => dispatch(push('/'))} />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </ToolBar>
        <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      </AppBar>
    </div>
  );
};

export default Header;
