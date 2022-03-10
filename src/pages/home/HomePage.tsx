/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { fetchGetUsers } from '../../store/users/usersActions';
import { useStateUsers } from '../../store/selectors';
import UsersList from '../../components/users-list';
import AntInput from '../../components/input';
import Sorting from '../../components/sorting';
import AntPagination from '../../components/pagination';
import styles from './HomePage.module.scss';

const HomePage:FC = () => {
  const dispath = useDispatch();
  const usersData = useStateUsers();
  const { usersList, searchStr, elementsOnPage } = usersData;

  // action creator
  const boundFetchGetUsers = () => dispath(fetchGetUsers(searchStr));
  // вызовет dispathFetchGetUsers с задержкой
  const debouncedDispathFetchGetUsers = debounce(boundFetchGetUsers, 500);

  useEffect(() => {
    debouncedDispathFetchGetUsers();
  }, [searchStr, elementsOnPage]);

  return (
    <main className={styles.main}>
      <AntInput />
      <Sorting />
      <UsersList />
      <AntPagination />
    </main>
  );
};

export default HomePage;
