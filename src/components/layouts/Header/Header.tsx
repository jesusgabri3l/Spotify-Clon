import { User } from '../../../store/UserStoreModels';

const Header = ({ user, type = 'me' }: {user : User, type : string}) => {
  const numberWithCommas = (followers: number) => followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
        <header className={`header ${type === 'me' ? 'blue' : 'red'} flex flex-col items-center lg:items-center lg:flex-wrap lg:flex-row`}>
          <img src={user.images && user.images[0].url} className="header__img" />
          <div>
            <p className="header__profile hidden text-l mb-2 text-center font-medium lg:ml-12 lg:text-left lg:block">{type === 'me' ? 'PROFILE' : 'ARTIST'}</p>
            <h2 className="header__name font-bold text-center text-4xl mt-2 text-ellipsis md:text-5xl lg:ml-12 lg:text-left  lg:text-7xl xl:text-8xl ">
              {user.display_name}
            </h2>
            <p className="header__profile text-base text-center text-gray mt-4 md:text-xl lg:ml-12  lg:text-left lg:mt-8">
              {numberWithCommas(user.followers.total)} followers
            </p>
          </div>
        </header>
  );
};

export default Header;
