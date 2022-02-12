import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUsersData, selectUsersStatus } from './redux/usersSlice';
import { fetchUsersAction } from './redux/users-operations';

import './App.css';
function App() {
  const users = useSelector(selectUsersData);
  const status = useSelector(selectUsersStatus);
  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  return (
    <div className="App">
      list
      <ul>
        {status === 'pending' ? (
          <p>loading</p>
        ) : (
          users.map((user, id) => (
            <li key={id}>
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
