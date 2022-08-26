import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoAlert from '../../components/alerts/InfoAlert';
import { Playlist as PlaylistModel } from '../../components/cards/Playlist/PlaylistModel';
import HeaderPlaylist from '../../components/layouts/Header/HeaderPlaylist';
import Loader from '../../components/layouts/Loader';
import Track from '../../components/layouts/Track/Track';
import api from '../../services/api';
const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPlayListInfo = async () => {
      try {
        setLoading(true);
        if (id === 'me') {
          const { data: playlistInfo } = await api.getCurrentUserInfo('/tracks/?limit=50');
          console.log(playlistInfo);
          setPlaylist({
            name: 'Liked tracks',
            owner: {
              display_name: 'Me'
            },
            images: [
              { url: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' }
            ],
            tracks: playlistInfo
          });
        } else {
          const { data: playlistInfo } = await api.getPlaylistInfo(id as string);
          setPlaylist(playlistInfo);
        }
      } catch (err: any) {
        if ((err.response.status === 400 || err.response.status === 404) && id === 'me') navigate('/');
      } finally {
        setLoading(false);
      }
    };

    getPlayListInfo();
  }, [id]);
  return (
        <div className="h-full w-full playlistPage">
          {
            loading
              ? <Loader />
              : <>
                <HeaderPlaylist playlist={playlist} />
                <div className="px-6 md:px-12">
                <section className="albumPage__trackList mt-6">
              <div className="home__content__tracks__content mt-2">
                {playlist &&
                 playlist.tracks.items.length > 0
                  ? playlist.tracks.items.map((track: any, index: number) => <Track
                track={track.track} index={index + 1} key={track.id} showImage={true} showAlbum={false} />
                  )
                  : <InfoAlert message="Looks like there's no tracks on this playlist" />
                }
              </div>
            </section>
                </div>
              </>
          }
        </div>
  );
};

export default Playlist;
