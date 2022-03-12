/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import ModalEdit from '../../form/modal/ModalEdit';
import { fetchGetUsers } from '../../../store/users/usersActions';
import { randomInteger } from '../../../utils';
import { changesUserData } from '../../../store/users/usersSlise';
import { useStateUsers } from '../../../store/selectors';
import { apiService } from '../../../services/apiService';
import styles from './UserPreview.module.scss';
import 'antd/es/modal/style/css';

interface UserPreviewProps {
  id:string,
  name:string,
  age:number
}

const UserPreview:FC<UserPreviewProps> = ({ id, name, age }) => {
  const dispath = useDispatch();
  const usersData = useStateUsers();
  const { usersList } = usersData;
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

  const updateUserData = (val:any) => {
    if (val.age !== age || val.name !== name) {
      const newObj = val;
      newObj.id = id;
      newObj.age = Number(val.age);

      // запрос на сервер на изменение данный пользоватлея
      apiService.putUserUpdate(id, newObj).then((res) => {
        if (res.name) {
          setNewName(res.name);
        }
        if (res.age) {
          setNewAge(res.age);
        }

        // передает в стор список с измененным элементом
        const newUserList = [...usersList].map((el:any) => (el.id === res.id ? el = res : el));

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
      <div className={styles.userButton}>
        <button
          type="button"
          className={styles.userButtonEdit}
          onClick={showModal}
        >
          <FormOutlined />
          Edit
        </button>
        <button
          type="button"
          className={styles.userButtonDelete}
          onClick={deleteUser}
        >
          <CloseCircleOutlined />
          Delete
        </button>
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
