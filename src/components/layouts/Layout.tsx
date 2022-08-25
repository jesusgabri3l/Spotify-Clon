import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import { PropsObserver } from '../../models/GlobalModels';
import Navbar from '../layouts/Navbar/Navbar';
// Styles at 'layouts/_layouts.scss'
const Layout = observer(({ UserStore }: PropsObserver) => {
  return (
        <>
          {
            !UserStore.user.id
              ? <Outlet />
              : <div className="page_wrapper">
            <Navbar UserStore={UserStore} />
            <div className="page_wrapper__content">
                  <Outlet />
            </div>
          </div>
          }
        </>
  );
});

export default Layout;
