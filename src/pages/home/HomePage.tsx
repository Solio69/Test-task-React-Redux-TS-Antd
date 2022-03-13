/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { fetchGetUsers } from '../../store/users/usersActions';
import UsersList from '../../components/users-list';
import AntInput from '../../components/input';
import Sorting from '../../components/sorting';
import AntPagination from '../../components/pagination';
import Loader from '../../components/loader';
import styles from './HomePage.module.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks/redux';

const HomePage:FC = () => {
  const dispath = useAppDispatch();
  const {
    searchStr, elementsOnPage, isLoading,
  } = useAppSelector((state) => state.usersReduser);

  // action creator
  const boundFetchGetUsers = () => dispath(fetchGetUsers(searchStr));
  // вызовет dispathFetchGetUsers с задержкой
  const debouncedDispathFetchGetUsers = debounce(boundFetchGetUsers, 500);

  const loader = isLoading ? <Loader /> : null;
  const input = <AntInput />;
  const list = !isLoading ? <UsersList /> : null;
  const sorting = !isLoading ? <Sorting /> : null;
  const pagination = !isLoading ? <AntPagination /> : null;

  useEffect(() => {
    debouncedDispathFetchGetUsers();
  }, [searchStr, elementsOnPage]);

  return (
    <main className={styles.main}>
      {loader}
      {input}
      {sorting}
      {list}
      {pagination}
    </main>
  );
};

export default HomePage;
