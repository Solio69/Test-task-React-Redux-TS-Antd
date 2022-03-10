/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { sortingUserList } from '../../store/users/usersSlise';

import styles from './Sorting.module.scss';

const Sorting:FC = () => {
  const dispath = useDispatch();

  const sortUp = () => {
    dispath(sortingUserList('sortUp'));
  };

  const sortDown = () => {
    dispath(sortingUserList('sortDown'));
  };

  return (
    <div className={styles.sorting}>
      <span className={styles.sortingText}>Sort users by age:</span>
      <button type="button" onClick={sortUp}><CaretUpOutlined /></button>
      <button type="button" onClick={sortDown}><CaretDownOutlined /></button>
    </div>
  );
};

export default Sorting;
