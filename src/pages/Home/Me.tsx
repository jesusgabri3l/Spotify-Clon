import { useEffect, useState } from 'react';
import { User } from '../../store/UserStoreModels';
import api from '../../services/api';
import Loader from '../../components/layouts/Loader';
import Header from '../../components/layouts/Header/Header';
import Artist from '../../components/layouts/Artist/Artist';
import { Artist as ArtistModel } from '../../components/layouts/Artist/ArtistModel';
import Track from '../../components/layouts/Track/Track';
import { Track as TrackModel } from '../../components/layouts/Track/TrackModel';
import Playlist from '../../components/layouts/Playlist/Playlist';
import { Playlist as PlaylistModel } from '../../components/layouts/Playlist/PlaylistModel';

const Me = ({ user }: {user: User}) => {
  const [artists, setArtists] = useState<ArtistModel[]>([]);
  const [tracks, setTracks] = useState<TrackModel[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [followingArtists, setFollowingArtists] = useState<ArtistModel[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserLibrary = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data: artistsResponse } = await api.getCurrentUserInfo('/top/artists/?limit=7&time_range=short_term');
        const { data: tracksResponse } = await api.getCurrentUserInfo('/top/tracks/?limit=4&time_range=short_term');
        const { data: playlistsResponse } = await api.getCurrentUserInfo('/playlists');
        const { data: following } = await api.getCurrentUserInfo('/following/?type=artist&limit=8');
        setArtists(artistsResponse.items);
        setTracks(tracksResponse.items);
        setPlaylists(playlistsResponse.items);
        setFollowingArtists(following.artists.items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getUserLibrary();
  }, []);

  return (
      <div className="h-full w-full home">
        <Header user={user} type="me" />
        {
          loading
            ? <Loader />
            : <div className="home__content mt-12 px-6 md:px-12">
          <div className="home__content__artists">
            <h3 className="home__content__title  text-xl mb-2 font-bold mb-6 md:text-2xl">Top artists this month</h3>
            <div className="home__content__artist__content flex items-center justify-around flex-wrap gap-y-5 gap-x-5 md:justify-start">
              {artists.map((artist: ArtistModel) => <Artist artist={artist} key={artist.id}/>)}
            </div>
          </div>
          <div className="home__content__tracks mt-14">
            <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">Top tracks this month</h3>
            <div className="home__content__tracks__content mt-2">
              {tracks.map((track: TrackModel, index: number) => <Track track={track} index={index} key={track.id}/>)}
            </div>
          </div>
          <div className="home__content__playlists mt-14">
            <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">Your playlists</h3>
            <div className="home__content__playlists__content flex items-center justify-around flex-wrap gap-y-5 gap-x-5 md:justify-start">
              {playlists.map((playlist: PlaylistModel) => <Playlist playlist = {playlist} key={playlist.id} />)}
            </div>
          </div>
          <div className="home__content__artists mt-14">
            <h3 className="home__content__title  text-xl mb-2 font-bold mb-6 md:text-2xl">Artists you follow</h3>
            <div className="home__content__artist__content flex items-center justify-around flex-wrap gap-y-5 gap-x-5 md:justify-start">
              {followingArtists.map((artist: ArtistModel) => <Artist artist={artist} key={artist.id}/>)}
            </div>
          </div>
      </div>
        }
      </div>
  );
};

export default Me;
