/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReduser from './users/usersSlise';

const rootReduser = combineReducers({
  usersReduser,
});

export const setUpStore = () => configureStore({
  reducer: rootReduser,
});

export type RootState = ReturnType<typeof rootReduser>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore['dispatch'];

export default rootReduser;
