/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import usersReduser from './users/usersSlise';

const store = configureStore({
  reducer: {
    users: usersReduser,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
