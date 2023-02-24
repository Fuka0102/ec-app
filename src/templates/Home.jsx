import React from 'react';
import { useSelector } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';

const Home = () => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);
  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーid：{uid}</p>
      <p>ユーザーネーム：{username}</p>
    </div>
  );
};

export default Home;
