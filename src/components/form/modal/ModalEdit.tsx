import React, { FC } from 'react';
import { Modal } from 'antd';
import CompletedForm from '../completed-form';

interface ModalEditProps{
  age?: number
  name?: string
  updateUserData:(value:{ age:number, name:string }) => void
  isModalVisible: boolean
  onCloseModal:() => void
}

const ModalEdit:FC<ModalEditProps> = ({
  name, age, updateUserData, isModalVisible, onCloseModal,
}) => {
  const onCancel = () => {
    onCloseModal();
  };

  return (
    <Modal
      title="Change user data"
      visible={isModalVisible}
      onCancel={onCancel}
      footer={false}
      width={400}
    >
      <CompletedForm name={name} age={age} updateUserData={updateUserData} />
    </Modal>
  );
};

export default ModalEdit;
