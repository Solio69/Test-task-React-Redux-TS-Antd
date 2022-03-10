/* eslint-disable @typescript-eslint/default-param-last */
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseStr = 'https://621c7b30768a4e1020ab3244.mockapi.io/api';

const fetchGetUsers = createAsyncThunk(
  'users/fetchGetUsers',
  async (name:string, { rejectWithValue }) => {
    const url = name ? `${baseStr}/users?name=${name}` : `${baseStr}/users`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}!`);
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export { fetchGetUsers };
