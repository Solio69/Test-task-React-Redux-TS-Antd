import React, { FC } from 'react';
import { FormOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './ButtonInList.module.scss';

export enum ButtonInUserPreviewVariant{
  delete = 'delete',
  edit = 'edit',
}

interface ButtonInUserPreviewProps{
  onClickFunc:()=>void
  variant:ButtonInUserPreviewVariant
}

const ButtonInUserPreview:FC<ButtonInUserPreviewProps> = ({ onClickFunc, variant }) => {
  const onClick = () => {
    onClickFunc();
  };

  return (
    <button
      type="button"
      className={variant === ButtonInUserPreviewVariant.edit ? styles.userButtonEdit : styles.userButtonDelete}
      onClick={onClick}
    >
      {variant === ButtonInUserPreviewVariant.edit ? <FormOutlined /> : <CloseCircleOutlined />}
      {variant === ButtonInUserPreviewVariant.edit ? 'Edit' : 'Delete'}
    </button>
  );
};

export default ButtonInUserPreview;
