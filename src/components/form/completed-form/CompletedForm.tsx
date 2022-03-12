import React, { FC, useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './CompletedForm.module.scss';

interface CompletedFormProps{
  age?:number
  name?:string
  updateUserData:(val:any)=>void
}

const CompletedForm:FC<CompletedFormProps> = ({ name, age, updateUserData }) => {
  const onFinish = (val:any) => {
    updateUserData(val);
  };

  // если данные были переданы то использует их
  const [fields] = useState([
    {
      name: ['name'],
      value: name || '',
    },
    {
      name: ['age'],
      value: age || '',
    },
  ]);

  // форма заполненная данными
  return (
    <Form
      size="middle"
      onFinish={onFinish}
      fields={fields}
      className={styles.editForm}
    >
      <Form.Item className={styles.formItem} name="name" label="Name">
        <Input type="text" />
      </Form.Item>

      <Form.Item className={styles.formItem} name="age" label="Age">
        <Input type="number" />
      </Form.Item>

      <Form.Item className={styles.formItem}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompletedForm;
