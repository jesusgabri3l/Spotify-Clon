import { Outlet, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { UserStoreImpl } from '../../store/UserStore';
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
            <nav className="navigator page_wrapper__nav">
              <ul className="navigator__list">
                <li className="navigator__list__item"><Link to="/">Home</Link></li>
                <li className="navigator__list__item"><Link to="/playlist">Search</Link></li>
                <li className="navigator__list__item"><Link to="/tracks">Your music</Link></li>
              </ul>
            </nav>
            <div className="overflow-y-auto page_wrapper__content">
                  <Outlet />
            </div>
          </div>
          }
        </>
  );
});

export default Layout;
