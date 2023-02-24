import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { signInAction } from '../reducks/users/actions';

const Login = () => {
  const dispacth = useDispatch();

  const selector = useSelector((state) => state);
  console.log(selector.router);

  return (
    <div>
      <h2>ログイン</h2>
      <button
        onClick={() => {
          dispacth(signInAction({ uid: '0001', username: 'torahack' }));
          dispacth(push('/'));
        }}
      >
        ログインする
      </button>
    </div>
  );
};
export default Login;
