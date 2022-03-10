import { useSelector, RootStateOrAny } from 'react-redux';

const useStateUsers = () => useSelector((state: RootStateOrAny) => state.users);

// const useStateUsers = () => useSelector((state: RootStateOrAny) => state.users.usersList);
// const useStateSearchStr = () => useSelector((state: RootStateOrAny) => state.users.searchStr);
// const useStateAtivePage = () => useSelector((state: RootStateOrAny) => state.users.activePage);
// const useStateElementsOnPage = () => useSelector((state: RootStateOrAny) => state.users.elementsOnPage);

export {
  useStateUsers,
};
