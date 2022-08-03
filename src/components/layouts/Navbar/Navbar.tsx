import { Link } from 'react-router-dom';
// Styles at 'layouts/_nav.scss'


const Navbar = () => {
  return (
        <nav className="navigator page_wrapper__nav">
              <ul className="navigator__list">
                <li className="navigator__list__item">
                  <Link to="/">
                    <i className="fa fa-home mr-2" />Home
                  </Link>
                </li>
                <li className="navigator__list__item">
                  <Link to="/playlist">
                  <i className="fa fa-search mr-2" />Search
                  </Link>
                </li>
                <li className="navigator__list__item">
                  <Link to="/tracks">
                    <i className="fa fa-music mr-2"/>Your music
                  </Link>
                </li>
              </ul>
            </nav>
  );
};
export default Navbar;
