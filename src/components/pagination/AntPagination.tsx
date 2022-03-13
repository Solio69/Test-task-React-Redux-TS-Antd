import React, { FC, MouseEvent, useEffect } from 'react';
import { Pagination } from 'antd';
import { useAppSelector, useAppDispatch } from '../../store/hooks/redux';
import { changesElementsOnPage, changesNumPage, changesMaxPages } from '../../store/users/usersSlise';
import styles from './AntPagination.module.scss';
import 'antd/es/pagination/style/css';

const AntPagination:FC = () => {
  const dispath = useAppDispatch();
  const usersData = useAppSelector((state) => state.usersReduser);
  const {
    usersList, maxPages, elementsOnPage, activePage,
  } = usersData;

  useEffect(() => {
    const lenghtList = usersList.length;
    // если elementsOnPage приводится к числу, то считает максимальное кол-во страниц
    if (maxPages) {
      const elementsOnPageNum = (Number(elementsOnPage));
      if (elementsOnPageNum) {
        dispath(changesMaxPages(Math.ceil(lenghtList / elementsOnPageNum)));
      } else {
        // если нет, максимальное кол-во страниц 0
        dispath(changesMaxPages(0));
      }
    }
  }, [elementsOnPage, dispath]);

  const onChange = (page: number) => {
    dispath(changesNumPage(page));
  };

  const onClick = (event:MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.innerText;
    dispath(changesElementsOnPage(value));
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationSettings}>
        <span className={styles.paginationSettingsText}>
          Show elements per page:
        </span>
        <button type="button" onClick={onClick}>5</button>
        <button type="button" onClick={onClick}>10</button>
        <button type="button" onClick={onClick}>all</button>
      </div>
      <Pagination
        total={maxPages * 10}
        current={activePage}
        showSizeChanger={false}
        onChange={onChange}
        className={styles['ant-pagination']}
      />
    </div>

  );
};

export default AntPagination;
