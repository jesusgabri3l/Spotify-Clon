import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/layouts/Header/Header';
import Loader from '../../components/layouts/Loader';
import Track from '../../components/layouts/Track/Track';
import { Track as TrackModel } from '../../components/layouts/Track/TrackModel';
import Album from '../../components/cards/Album/Album';

const ArtistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artistInfo, setArtistInfo] = useState<any>();
  const [artistTopTracks, setArtistTopTracks] = useState<any>();
  const [albums, setAlbums] = useState<any>();
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const followAnArtist = async () => {
    try {
      await api.putCurrentUserInfo(`/following/?ids=${id}&type=artist`);
      setArtistInfo({ ...artistInfo, following: true });
    } catch (e) {
      console.error(e);
    }
  };
  const unfollowAnArtist = async () => {
    try {
      await api.deleteCurrentUserInfo(`/following/?ids=${id}&type=artist`);
      setArtistInfo({ ...artistInfo, following: false });
    } catch (e) {
      console.error(e);
    }
  };
  const getArtistInfo = async () => {
    try {
      const { data: artist } = await api.getArtistInfo(id as string);
      const { data: artistTop } = await api.getArtistTopTracks(id as string);
      const { data: albumsResponse } = await api.getArtistInfo(id as string, '/albums/?include_groups=album&limit=5');
      const { data: isFollowing } = await api.getCurrentUserInfo(`/following/contains/?ids=${id}&type=artist`);
      artist.display_name = artist.name;
      artist.following = isFollowing[0];
      setArtistInfo(artist);
      setArtistTopTracks(artistTop.tracks);
      setAlbums(albumsResponse.items);
    } catch (err: any) {
      if (err.response.status === 400 || err.response.status === 404) navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getArtistInfo();
    else navigate('/');
  }, []);

  return (
    <div className="h-full w-full artistPage">
        {
            loading
              ? <Loader />
              : <>
                    <Header user={artistInfo} type='artist' actions={{ follow: followAnArtist, unfollow: unfollowAnArtist }} />
                    <div className="artistPage__content mt-12 px-6 md:px-12">
                        <div className="artistPage__content__toptracks">
                            <h3 className="home__content__title text-xl mb-2 font-bold mb-6 md:text-2xl">Most popular tracks</h3>
                            <div className="artistPage__content__toptracks__content mt-2">
                                {
                                  // FIRST 5
                                artistTopTracks.map((track: TrackModel, index: number) => {
                                  if (index < 5) {
                                    return <Track track={track} index={index} key={track.id} type='artist' />;
                                  } else {
                                    return '';
                                  }
                                })
                                }
                                {
                                  // LAST 5
                                seeMore && artistTopTracks.map((track: TrackModel, index: number) => {
                                  if (index > 5) {
                                    return <Track track={track} index={index} key={track.id} type='artist' />;
                                  } else {
                                    return '';
                                  }
                                })
                                }
                                <button className="ml-6 mt-8 text-sm uppercase text-gray font-bold"
                                onClick={() => setSeeMore(!seeMore)}>
                                  {seeMore ? 'See less' : 'See more'}
                                </button>
                            </div>
                        </div>
                      <section className="mt-14">
                          <h3 className="text-xl mb-2 font-bold mb-6 md:text-2xl">Discography</h3>
                          <div className="flex items-center justify-around flex-wrap gap-y-5 gap-x-7 md:justify-start">
                            {albums.map((album: any) => <Album key={album.id} album={album} />)}
                          </div>
                      </section>
                    </div>
                </>
        }
    </div>
  );
};

export default ArtistPage;
