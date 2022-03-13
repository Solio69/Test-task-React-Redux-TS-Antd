import React, { FC } from 'react';
import { Spin, Space } from 'antd';
import styles from './Loader.module.scss';
import 'antd/es/spin/style/css';

const Loader:FC = () => (
  <Space size="large" className={styles['ant-spin-spinning']}>
    <Spin size="large" />
  </Space>
);

export default Loader;
