/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import { changeSearchStr } from '../../store/users/usersSlise';
import styles from './AntInput.module.scss';
import 'antd/es/input/style/css';

const AntInput:FC = () => {
  const dispath = useDispatch();

  // получит значение из input и передаст его в stor redux
  const onChange = (event:ChangeEvent<HTMLInputElement>):void => {
    let { value } = event.target;
    value = value.trim().toLowerCase();
    dispath(changeSearchStr(value));
  };

  return (
    <div className={styles.inputWrapper}>
      <Input
        placeholder="Search by name"
        onChange={onChange}
        className={styles['ant-input']}
      />
    </div>

  );
};

export default AntInput;
