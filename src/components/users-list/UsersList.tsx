import React, { FC } from 'react';
import { useStateUsers } from '../../store/selectors';
import UserPreview from '../user/user-preview';
import styles from './UsersList.module.scss';

const UsersList:FC = () => {
  const usersData = useStateUsers();
  const {
    usersList, isSorting, elementsOnPage, activePage,
  } = usersData;

  // вернет отсортированный список
  const sortingList = () => {
    const newList = [...usersList];
    if (isSorting === 'sortDown') {
      return newList.sort((a:any, b:any) => (a.age < b.age ? 1 : -1));
    } if (isSorting === 'sortUp') {
      return newList.sort((a:any, b:any) => (a.age > b.age ? 1 : -1));
    }

    return newList;
  };

  // получить часть списка в зависимости от количества элементов на странице и номера страницы
  function getPartList () {
    const oldArr = [...sortingList()];
    let newArr = [];
    if (Number(elementsOnPage)) {
      const oneElem = ((activePage - 1) * elementsOnPage);
      newArr = oldArr.splice(oneElem, elementsOnPage);

      return newArr;
    }

    return oldArr;
  }

  const renderList = getPartList().map((el:any) => <UserPreview id={el.id} name={el.name} age={el.age} key={el.id} />);

  return (
    <ul className={styles.usersList}>
      {renderList}
    </ul>
  );
};

export default UsersList;
