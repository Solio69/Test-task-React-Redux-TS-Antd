/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks/redux';
import UserPreview from '../user-preview';
import styles from './UsersList.module.scss';

const UsersList:FC = () => {
  const usersData = useAppSelector((state) => state.usersReduser);
  const {
    usersList, isSorting, elementsOnPage, activePage,
  } = usersData;

  // вернет отсортированный список
  const sortingList = () => {
    const newList = [...usersList];
    if (isSorting === 'sortDown') {
      return newList.sort((nex, prev) => (nex.age < prev.age ? 1 : -1));
    } if (isSorting === 'sortUp') {
      return newList.sort((nex, prev) => (nex.age > prev.age ? 1 : -1));
    }

    return newList;
  };

  // получить часть списка в зависимости от количества элементов на странице и номера страницы
  function getPartList () {
    const oldArr = [...sortingList()];
    let newArr = [];
    const elementsOnPageNum = Number(elementsOnPage);
    if (elementsOnPageNum) {
      const oneElem = ((activePage - 1) * elementsOnPageNum);
      newArr = oldArr.splice(oneElem, elementsOnPageNum);

      return newArr;
    }

    return oldArr;
  }

  const renderList = usersList ? getPartList().map((el) => <UserPreview id={el.id} name={el.name} age={el.age} key={el.id} />) : [];

  return (
    <ul className={styles.usersList}>
      {renderList}
    </ul>
  );
};

export default UsersList;
