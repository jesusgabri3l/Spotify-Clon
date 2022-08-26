import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { PropsObserver } from '../../models/GlobalModels';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/layouts/Loader';
import useFilterDiscography from '../../utils/hooks/useFilterDiscography';
import SectionFlex from '../../components/layouts/SectionFlex';
import InfoAlert from '../../components/alerts/InfoAlert';
import Album from '../../components/cards/Album/Album';
import Artist from '../../components/cards/Artist/Artist';
import Playlist from '../../components/cards/Playlist/Playlist';
const MyMusic = observer(({ UserStore }: PropsObserver) => {
  const navigate = useNavigate();
  const discography = useFilterDiscography();

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getUsersLibrary = async () => {
      try {
        const { data: albums } = await api.getCurrentUserInfo('/albums/?limit=50');
        const { data: artists } = await api.getCurrentUserInfo('/following/?type=artist&limit=50');
        discography.setDataDiscography(
          {
            albumsResponse: albums.items,
            singlesResponse: artists.artists.items,
            compilationsResponse: UserStore.user.playlists!
          });
      } catch (err: any) {
        if (err.response.status === 400) navigate('/');
      } finally {
        setLoading(false);
      }
    };
    getUsersLibrary();
  }, []);
  return (
    <div className="h-full h-full">
      {
        loading
          ? <Loader />
          : <div className="px-6 md:px-12 pt-12">
            <div className="flex gap-7 mb-12">
              <button
                      onClick={() => discography.handleFilterDiscographyClick('album')}
                      className={`px-4 py-2 text-xs font-medium 
                      ${discography.filterBy === 'album' ? 'bg-white rounded-xl text-black' : 'element_wrapper'}`}>
                        ALBUMS
              </button>
              <button
                    onClick={() => discography.handleFilterDiscographyClick('single')}
                    className={`px-4 py-2 text-xs font-medium 
                    ${discography.filterBy === 'single' ? 'bg-white rounded-xl text-black' : 'element_wrapper'}`}>
                      ARTISTS
              </button>
              <button
                    onClick={() => discography.handleFilterDiscographyClick('compilation')}
                    className={`px-4 py-2 text-xs font-medium 
                    ${discography.filterBy === 'compilation' ? 'bg-white rounded-xl text-black' : 'element_wrapper'}`}>
                      PLAYLISTS
              </button>
            </div>
              <SectionFlex>
                {
                  discography.items.length > 0
                    ? discography.items.map((item: any) => {
                      if (discography.filterBy === 'single') return <Artist key={item.id} artist={item}/>;
                      if (discography.filterBy === 'album') return <Album album={item.album} key={item.album.id} />;
                      if (discography.filterBy === 'compilation') return <Playlist playlist={item} key={item.id} />;
                      return null;
                    })
                    : <InfoAlert message='Looks like you do not have information in this section yet!'/>
                }
              </SectionFlex>
            </div>
      }

    </div>
  );
});

export default MyMusic;
