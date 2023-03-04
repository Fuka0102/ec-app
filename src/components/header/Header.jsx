import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import ToolBar from '@material-ui/core/ToolBar';
import { getSignedIn } from '../../reducks/users/selectors';
import logo from '../../assets/img/icons/logo.png';
import { push } from 'connected-react-router';

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

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.menuBar}>
        <ToolBar className={classes.toolBar}>
          <img src={logo} alt='ロゴ' width='48px' onClick={() => dispatch(push('/'))} />
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default Header;
