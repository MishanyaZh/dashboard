import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser, editUser } from './usersSlice';
import axios from 'axios';

axios.defaults.baseURL = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchUsersAction = createAsyncThunk(
  'users/fetchUsersAction',
  async (_, { rejectWithValue }) => {
    try {
      const responce = await axios.get(axios.defaults.baseURL);

      if (responce.status !== 200) {
        throw new Error('Error!!!');
      }
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addUserAction = createAsyncThunk(
  'users/addUserAction',

  async (newUser, { rejectWithValue, dispatch }) => {
    try {
      const user = {
        ...newUser,
        // id: newUser.id,
        // name: newUser.name,
        // username: newUser.username,
        // email: newUser.id,
        // city: newUser.city,
      };
      const responce = await axios.post(axios.defaults.baseURL, user);
      console.log(responce.data);

      if (responce.status !== 200) {
        throw new Error('Error!!!');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deletehUsersAction = createAsyncThunk(
  'users/deletehUsersAction',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const responce = await axios.delete(`${id}`);

      if (responce.status !== 200) {
        throw new Error('Error!!!');
      }

      dispatch(deleteUser({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const edithUsersAction = createAsyncThunk(
  'users/edithUsersAction',
  async (newUser, { dispatch }) => {
    // console.log(newUser);
    const id = newUser.id;
    const requestOptions = {
      method: 'PUT',
      heders: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newUser }),
    };
    const response = await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/1${id}`,
      requestOptions,
    );
    const data = await response.json();
    console.log(data.meta.arg);

    dispatch(editUser(...data.meta.arg));
  },
);
