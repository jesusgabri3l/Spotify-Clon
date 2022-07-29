import { UserStoreImpl } from '../../store/UserStore';
import { observer } from 'mobx-react';
import { useLocation, Navigate } from 'react-router-dom';

interface Props {
  UserStore: UserStoreImpl;
  // eslint-disable-next-line no-undef
  children: JSX.Element
}
const ProtectedPage = observer(({ UserStore, children }: Props) => {
  const location = useLocation();
  if (!UserStore.user.id) return <Navigate to="/" state={{ from: location }} replace />;

  return children;
});

export default ProtectedPage;
