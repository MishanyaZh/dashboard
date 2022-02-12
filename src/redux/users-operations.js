import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`;

export const fetchUsersAction = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const { data } = await axios.get(axios.defaults.baseURL);
      return data;
    } catch (error) {}
  },
);
