/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetUsers } from './usersActions';
import { IUser } from '../../types/types';

interface InitialStateTypes {
  usersList: IUser[],
  searchStr:string,
  isSorting:'sortUp' | 'sortDown' | '',
  maxPages:number,
  activePage:number,
  elementsOnPage:string,
  isLoading:boolean
}

const initialState: InitialStateTypes = {
  usersList: [],
  searchStr: '',
  isSorting: '',
  maxPages: 0,
  activePage: 1,
  elementsOnPage: '5',
  isLoading: true,
};

export const usersSlise = createSlice({
  name: 'users',
  initialState,

  reducers: {
    changeSearchStr (state, action:PayloadAction<string>) {
      state.searchStr = action.payload;
    },

    sortingUserList (state, action:PayloadAction<'sortUp' | 'sortDown' | ''>) {
      state.isSorting = action.payload;
    },

    changesElementsOnPage (state, action:PayloadAction<string>) {
      state.elementsOnPage = action.payload;
    },

    changesMaxPages (state, action:PayloadAction<number>) {
      state.maxPages = action.payload;
    },

    changesNumPage (state, action:PayloadAction<number>) {
      state.activePage = action.payload;
    },

    changesUserData (state, action:PayloadAction<IUser[]>) {
      state.usersList = action.payload;
    },
  },

  extraReducers: {
    [fetchGetUsers.pending.type]: (state) => {
      state.isLoading = true;
    },

    [fetchGetUsers.fulfilled.type]: (state, action) => {
      state.usersList = action.payload;
      state.isLoading = false;
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
      state.isLoading = false;
    },
  },
});

export const {
  changeSearchStr, sortingUserList, changesElementsOnPage, changesNumPage, changesMaxPages, changesUserData,
} = usersSlise.actions;

export default usersSlise.reducer;
