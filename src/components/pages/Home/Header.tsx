import { User } from '../../../store/UserStoreModels';

const Header = ({ user }: {user : User}) => {
  return (
        <header className="home__header flex flex-col items-center lg:items-center lg:flex-wrap lg:flex-row">
          <img src={user.images[0].url} className="home__header__img" />
          <div>
            <p className="home__header__profile hidden text-l mb-2 text-center font-medium lg:ml-12 lg:text-left lg:block">PROFILE</p>
            <h2 className="home__header__name font-bold text-center text-2xl mt-2 md:text-4xl lg:ml-12 lg:text-left  lg:text-7xl xl:text-8xl ">
              {user.display_name}
            </h2>
            <p className="home__header__profile text-base text-center text-gray mt-1 lg:ml-12 lg:text-left lg:mt-8 lg:text-xl ">
              {user.followers.total} followers
            </p>
          </div>
        </header>
  );
};

export default Header;
