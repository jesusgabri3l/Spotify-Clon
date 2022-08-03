import { useEffect, useState } from 'react';
import { User } from '../../store/UserStoreModels';
import api from '../../services/api';
import Loader from '../../components/layouts/Loader';
import Header from '../../components/pages/Home/Header';
import Artist from '../../components/layouts/Artist/Artist';
import { Artist as ArtistModel } from '../../components/layouts/Artist/ArtistModel';
import Track from '../../components/layouts/Track/Track';
import { Track as TrackModel } from '../../components/layouts/Track/TrackModel';

const Me = ({ user }: {user: User}) => {
  const [artists, setArtists] = useState<ArtistModel[]>([]);
  const [tracks, setTracks] = useState<TrackModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserLibrary = async (): Promise<void> => {
      setLoading(true);
      const { data: tracks } = await api.getCurrentInfo('/top/tracks/?limit=4&time_range=short_term');
      const { data: artists } = await api.getCurrentInfo('/top/artists/?limit=6&time_range=short_term');
      setArtists(artists.items);
      setTracks(tracks.items);
      setLoading(false);
    };
    getUserLibrary();
  }, []);

  return (
      <div className="h-full w-full home">
        <Header user={user} />
        {
          loading
            ? <Loader />
            : <div className="home__content mt-12 px-6 md:px-12">
          <div className="home__content__artists">
            <h3 className="home__content__title  text-xl mb-2 font-bold mb-6 md:text-2xl">Top artists this month</h3>
            <div className="home__content__artist__content flex items-center flex-wrap justify-around gap-y-5 gap-x-5">
              {artists.map((artist: any) => <Artist artist={artist} key={artist.id}/>)}
            </div>
          </div>
          <div className="home__content__tracks mt-12">
            <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">Top tracks this month</h3>
            <div className="home__content__tracks__content mt-2">
              {tracks.map((track, index): any => <Track track={track} index={index} key={track.id}/>)}
            </div>
          </div>
      </div>
        }
      </div>
  );
};

export default Me;
