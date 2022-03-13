/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../types/types';
import ModalEdit from '../../form/modal/ModalEdit';
import { fetchGetUsers } from '../../../store/users/usersActions';
import { randomInteger } from '../../../utils';
import { changesUserData } from '../../../store/users/usersSlise';
import { useAppSelector, useAppDispatch } from '../../../store/hooks/redux';
import { apiService } from '../../../services/apiService';
import styles from './UserPreview.module.scss';
import 'antd/es/modal/style/css';
import ButtonInUserPreview, { ButtonInUserPreviewVariant } from '../../buttons/button-in-userPreview/ButtonInUserPreview';

interface UserPreviewProps {
  id:string,
  name:string,
  age:number
}

const UserPreview:FC<UserPreviewProps> = ({ id, name, age }) => {
  const dispath = useAppDispatch();
  const { usersList } = useAppSelector((state) => state.usersReduser);
  const [newAge, setNewAge] = useState(age);
  const [newName, setNewName] = useState(name);

  // генерирует ссылку на рандомный аватар
  const randonAvatar = `https://i.pravatar.cc/150?img=${randomInteger(1, 70)}`;

  const routStr = `/user/${name}`;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const updateUserData = (value:{ age:number, name:string }) => {
    if (value.age !== age || value.name !== name) {
      const newObj = value;

      // запрос на сервер на изменение данный пользоватлея
      apiService.putUserUpdate(id, newObj)
        .then((res:IUser) => {
          if (res.name) {
            setNewName(res.name);
          }
          if (res.age) {
            setNewAge(res.age);
          }

          // передает в стор список с измененным элементом
          const newUserList:IUser[] = [...usersList].map((el:IUser) => (el.id === res.id ? el = res : el));

          dispath(changesUserData(newUserList));
        });
    }

    setIsModalVisible(false);
  };

  const deleteUser = () => {
    // запрос на сервер с удалением пользователя
    apiService.deleteUser(id).then(() => {
      // получает обновленный список пользоватлей
      dispath(fetchGetUsers(''));
    });
  };

  // модальное окно
  const modal = (
    <ModalEdit
      onCloseModal={onCloseModal}
      name={name}
      age={age}
      isModalVisible={isModalVisible}
      updateUserData={updateUserData}
    />
  );

  const userPreview = (
    <li key={id} className={styles.userPreview}>
      <div className={styles.userAvatarWrapper}>
        <img src={randonAvatar} alt="avatar" />
      </div>
      <div className={styles.userInfo}>
        <Link to={routStr}>
          <div className={styles.userInfoItem}>
            Name:
            {' '}
            {newName}
          </div>
        </Link>
        <div className={styles.userInfoItem}>
          Age:
          {' '}
          {newAge}
        </div>
      </div>
      <div className={styles.buttonInList}>
        <ButtonInUserPreview
          variant={ButtonInUserPreviewVariant.edit}
          onClickFunc={showModal}
        />
        <ButtonInUserPreview
          variant={ButtonInUserPreviewVariant.delete}
          onClickFunc={deleteUser}
        />
      </div>
    </li>
  );

  return (
    <>
      {userPreview}
      {modal}
    </>

  );
};

export default UserPreview;
