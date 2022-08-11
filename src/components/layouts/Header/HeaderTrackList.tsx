import { Link } from 'react-router-dom';
import { getAlbumReleaseDate } from '../../../utils';
const HeaderTrackList = ({ info }: any) => {
  return (
        <header className="header header--track-list green flex flex-col items-center lg:items-center lg:flex-row">
          <img src={info.images[0].url } className="header__img header--track-list__img shadow-xl"/>
          <div className="lg:ml-12">
            <p className="header__profile hidden text-l mb-2 uppercase text-center font-medium lg:text-left lg:block">
              {info.album_type}
            </p>
            <h2
            className={
              `header__name font-bold text-center mt-2 lg:text-left 
              ${info.name && info.name?.length > 20 ? 'text-lg md:text-4xl' : 'text-2xl md:text-5xl lg:text-8xl'}`
              }>
              {info.name}
            </h2>
            <p className="header__profile text-xs text-center font-bold mt-3 md:text-base  lg:text-left lg:mt-6">
              {
                info.artists.map((artist: any) =>
                <span key={ artist.id }>
                  <Link className="hover:underline" to={`/artist/${artist.id}`}> {artist.name} </Link> •
                </span>
                )
              }
              <span className="font-normal">{getAlbumReleaseDate(info)}</span>
              <span className="font-normal text-gray"> • {info.total_tracks} tracks</span>
            </p>
          </div>
        </header>
  );
};

export default HeaderTrackList;
