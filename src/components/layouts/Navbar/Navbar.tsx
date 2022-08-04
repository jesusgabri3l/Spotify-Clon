import CustomLink from '../../router/CustomLink';

// Styles at 'layouts/_nav.scss'

const Navbar = () => {
  return (
        <nav className="navigator page_wrapper__nav">
              <ul className="navigator__list">
                <li className="navigator__list__item">
                  <CustomLink to="/">
                    <i className="fa fa-home mr-2" />
                    <span>Home</span>
                  </CustomLink>
                </li>
                <li className="navigator__list__item">
                  <CustomLink to="/playlist">
                  <i className="fa fa-search mr-2" />
                  <span>Search</span>
                  </CustomLink>
                </li>
                <li className="navigator__list__item">
                  <CustomLink to="/tracks">
                    <i className="fa fa-music mr-2"/>
                    <span>Your music</span>
                  </CustomLink>
                </li>
              </ul>
            </nav>
  );
};
export default Navbar;
