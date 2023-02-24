import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

const Login = () => {
  const dispacth = useDispatch();

  const selector = useSelector((state) => state);
  console.log(selector.router);

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispacth(push('/'))}>ログインする</button>
    </div>
  );
};
export default Login;
