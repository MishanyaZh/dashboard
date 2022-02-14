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

  async (newUser, { rejectWithValue }) => {
    try {
      const user = {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id,
      };
      const responce = await axios.post(axios.defaults.baseURL, user);

      if (responce.status !== 201) {
        throw new Error('Error!!!');
      }
      return responce.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const edithUsersAction = createAsyncThunk(
  'users/edithUsersAction',
  async (id, { rejectWithValue }) => {
    try {
      const user = {
        id: id.id,
        name: id.name,
        username: id.username,
        email: id.email,
        city: id.city,
      };
      const responce = await axios.put(`${id.id}`, user);
      if (responce.status !== 200) {
        throw new Error('Error!!!');
      }
      return responce.data;
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
