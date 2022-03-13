/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetUsers } from './usersActions';
import { IUser } from '../../types/types';

interface InitialStateTypes {
  usersList: IUser[],
  searchStr:string,
  isSorting:'sortUp' | 'sortDown' | '',
  maxPages:number,
  activePage:number,
  elementsOnPage:string
}

const initialState: InitialStateTypes = {
  usersList: [],
  searchStr: '',
  isSorting: '',
  maxPages: 0,
  activePage: 1,
  elementsOnPage: '5',
};

export const usersSlise = createSlice({
  name: 'users',
  initialState,

  reducers: {
    changeSearchStr (state, action:PayloadAction<string>) {
      state.searchStr = action.payload;
    },

    sortingUserList (state, action) {
      state.isSorting = action.payload;
    },

    changesElementsOnPage (state, action) {
      state.elementsOnPage = action.payload;
    },

    changesMaxPages (state, action) {
      state.maxPages = action.payload;
    },

    changesNumPage (state, action) {
      state.activePage = action.payload;
    },

    changesUserData (state, action) {
      state.usersList = action.payload;
    },
  },

  extraReducers: {
    [fetchGetUsers.pending.type]: (state) => {
      // console.log('pending', action.payload)
    },

    [fetchGetUsers.fulfilled.type]: (state, action) => {
      // console.log('fulfilled', action);
      state.usersList = action.payload;
      const lenghtList = action.payload.length;
      // если elementsOnPage приводится к числу, то считает максимальное кол-во страниц
      const elementsOnPage = (Number(state.elementsOnPage));
      if (elementsOnPage) {
        // то пересчитает maxPages
        state.maxPages = Math.ceil(lenghtList / elementsOnPage);
      }
    },

    [fetchGetUsers.rejected.type]: (state, action) => {
      // console.log('rejected', action.payload)
    },
  },
});

export const {
  changeSearchStr, sortingUserList, changesElementsOnPage, changesNumPage, changesMaxPages, changesUserData,
} = usersSlise.actions;

export default usersSlise.reducer;
