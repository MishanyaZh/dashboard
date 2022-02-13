import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser, editUser } from './usersSlice';
import axios from 'axios';

axios.defaults.baseURL = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

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

export const edithUsersAction = createAsyncThunk(
  'users/edithUsersAction',
  async (id, { rejectWithValue, dispatch, getState }) => {
    const Users = getState().users.users;
    const edithUser = Users.find(user => user.id === id.id);

    try {
      const user = {
        id: edithUser.id,
        name: edithUser.name,
        username: edithUser.username,
        email: edithUser.email,
        city: edithUser.address.city,
      };
      const responce = await axios.put(`${id.id}`, user);
      if (responce.status !== 200) {
        throw new Error('Error!!!');
      }
      return responce.data;
      // dispatch(editUser(responce.data));
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
