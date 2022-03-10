/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  Form, Input, Button, Modal,
} from 'antd';
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

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (val:any) => {
    if (val.age !== age || val.name !== name) {
      const newObj = val;
      newObj.id = id;
      newObj.age = Number(val.age);

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
    apiService.deleteUser(id).then(() => {
      dispath(fetchGetUsers(''));
    });
  };

  // форма заполненная данными
  const CompletedForm = () => {
    const [fields] = useState([
      {
        name: ['name'],
        value: name,
      },
      {
        name: ['age'],
        value: age,
      },
    ]);

    return (
      <Form
        size="middle"
        onFinish={onFinish}
        fields={fields}
      >

        <Form.Item name="name" label="Name:">
          <Input type="text" />
        </Form.Item>

        <Form.Item name="age" label="Age:">
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  // модальное окно
  const modal = (
    <Modal
      title="Change user data"
      visible={isModalVisible}
      onCancel={onCancel}
      footer={false}
    >
      <CompletedForm />
    </Modal>
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
