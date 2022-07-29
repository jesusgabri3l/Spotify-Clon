import { useEffect, useState } from 'react';
import { User } from '../../store/UserStoreModels';
import api from '../../services/api';
import Loader from '../../components/layouts/Loader';

const Me = ({ user }: {user: User}) => {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const getTracks = async (): Promise<void> => {
      setLoading(true);
      const { data: tracks } = await api.getCurrentInfo('/top/tracks/?limit=4&time_range=short_term');
      const { data: artists } = await api.getCurrentInfo('/top/artists/?limit=8&time_range=short_term');
      setArtists(artists.items);
      setTracks(tracks.items);
      setLoading(false);
      console.log(tracks);
    };
    getTracks();
  }, []);

  const concataneArtists = (artists: any[]) => {
    const concatanedArtists = artists.map((artist: any) => artist.name).join(', ');
    return <p className="toptrack__mainInfo__naming__name text-xs text-gray mt-1">{concatanedArtists}</p>;
  };
  const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < '10' ? '0' : '') + seconds;
  };
  return (
      <div className="h-full w-full home">
        <header className="home__header flex items-center">
          <img src={user.images[0].url} className="home__header__img" />
          <div>
            <p className="home__header__profile text-l ml-12 mb-2 font-medium">PROFILE</p>
            <h2 className="home__header__name text-8xl font-bold ml-12">{user.display_name}</h2>
            <p className="home__header__profile text-xl ml-12 mt-8 text-gray">{user.followers.total} followers</p>
          </div>
        </header>
        {
          loading
            ? <Loader />
            : <div className="home__content mt-12 px-12 pb-12">
          <div className="home__content__artists">
            <h3 className="home__content__title text-2xl mb-2 font-bold mb-6">Top artists this month</h3>
            <div className="home__content__artist__content flex items-center flex-wrap gap-x-5 gap-y-5">
              {
                artists.map((artist: any) => <div className="artist py-6" key={artist.id}>
                <img className="artist__image" src={artist.images[0].url} />
                <div className="pl-4">
                  <p className="artist__name font-medium mt-5">{artist.name}</p>
                  <p className="artist__name mt-2 text-sm text-gray">Artist</p>
                </div>
            </div>)
              }
            </div>
          </div>
          <div className="home__content__tracks mt-12">
            <h3 className="home__content__title text-2xl mb-2 font-bold mb-6">Top tracks this month</h3>
            <div className="home__content__tracks__content mt-2">
              {tracks.map((track, index): any => <div className="toptrack py-2 px-5 rounded-2xl flex justify-between items-center mt-1" key={track.id}>
                <div className="toptrack__mainInfo flex items-center gap-x-6 basis-2/6">
                  <p className="toptrack__mainInfo__number text-gray">{index + 1}</p>
                  <img src={track.album.images[2].url} className="toptrack__mainInfo__img rounded-2xl"/>
                  <div className="toprack__mainInfo__naming">
                    <p className="toptrack__mainInfo__naming__name font-medium">{track.name}</p>
                    {concataneArtists(track.artists)}
                  </div>
                </div>
                <p className="toptrack__album text-sm text-gray text-left basis-1/6">{track.album.name}</p>
                <p className="toptrack__album text-sm text-gray text-right">{millisToMinutesAndSeconds(track.duration_ms)}</p>
              </div>)}
            </div>
          </div>
      </div>
        }

      </div>
  );
};

export default Me;
