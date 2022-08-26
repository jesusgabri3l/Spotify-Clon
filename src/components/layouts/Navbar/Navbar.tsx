import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import CustomLink from '../../router/CustomLink';
import { PropsObserver } from '../../../models/GlobalModels';
import { Link } from 'react-router-dom';
import userDefaultImg from '../../../assets/images/default-user.png';
// Styles at 'components/_nav.scss'

const Navbar = observer(({ UserStore }: PropsObserver) => {
  const [activeDropDown, setActiveDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener('click', (evt) => {
      if (dropdownRef.current!.contains(evt.target)) return;
      setActiveDropdown(false);
    });
  }, []);
  return (
        <nav className="navigator page_wrapper__nav relative">
              <ul className="navigator__list">
                <li className="navigator__list__item">
                  <CustomLink to="/">
                    <i className="fa fa-home mr-2" />
                    <span>Home</span>
                  </CustomLink>
                </li>
                <li className="navigator__list__item">
                  <CustomLink to="/search">
                  <i className="fa fa-search mr-2" />
                  <span>Search</span>
                  </CustomLink>
                </li>
                <li className="navigator__list__item">
                  <CustomLink to="/mymusic">
                    <i className="fa fa-music mr-2"/>
                    <span>Your music</span>
                  </CustomLink>
                </li>
              </ul>
                <hr className="hr" />
                <ul className="overflow-auto h-3/5 pt-6">
                  {
                    UserStore.user.playlists &&
                    UserStore.user.playlists.length > 0
                      ? UserStore.user.playlists.map((playlist: any) =>
                      <li
                      className="mb-6 block text-sm text-gray-400 hover:underline hover:text-white"
                      key={playlist.id}
                      >
                      <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link> </li>)
                      : <p>You have no playlists yet</p>
                  }
                </ul>
                  {
                    UserStore.user.images && UserStore.user.display_name &&
                    <button className="navigator__user element_wrapper" onClick={ () => setActiveDropdown(!activeDropDown)} ref={dropdownRef}> 
                        <img className="navigator__user__img" src={UserStore.user.images[0].url || userDefaultImg}/>
                        <p className="navigator__user__name text-lg ml-3">{UserStore.user.display_name}</p>
                        <i className="fa fa-angle-right ml-8"></i>
                    </button>
                  }
                  <div className={`navigator__dropdown ${activeDropDown && 'active'}`}>
                    <ul className="navigator__dropdown__list w-full">
                      <li className="navigator__dropdown__list__item">
                      <Link to="/" className="navigator__dropdown__list__button block p-3">Profile</Link>
                      </li>
                      <li className="navigator__dropdown__list__item w-full">
                        <button className="navigator__dropdown__list__button block p-3 w-full text-left">Logout</button>
                      </li>
                    </ul>
                  </div>
            </nav>
  );
});
export default Navbar;
