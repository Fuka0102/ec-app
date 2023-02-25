import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { signOut } from '../reducks/users/operations';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);
  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーid：{uid}</p>
      <p>ユーザーネーム：{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
