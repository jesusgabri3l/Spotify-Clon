import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import { UserStoreImpl } from '../../store/UserStore';
import Navbar from '../layouts/Navbar/Navbar';
// Styles at 'layouts/_layouts.scss'
interface Props {
  UserStore: UserStoreImpl;
}
const Layout = observer(({ UserStore }: Props) => {
  return (
        <>
          {
            !UserStore.user.id
              ? <Outlet />
              : <div className="page_wrapper">
            <Navbar />
            <div className="page_wrapper__content">
                  <Outlet />
            </div>
          </div>
          }
        </>
  );
});

export default Layout;
