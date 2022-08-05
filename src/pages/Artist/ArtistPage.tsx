import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/layouts/Header/Header';
import Loader from '../../components/layouts/Loader';
import Track from '../../components/layouts/Track/Track';
import { Track as TrackModel } from '../../components/layouts/Track/TrackModel';

const ArtistPage = () => {
  const { id } = useParams();
  const [artistInfo, setArtistInfo] = useState<any>();
  const [artistTopTracks, setArtistTopTracks] = useState<any>();
  const [seeMore, setSeeMore] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const { data: artist } = await api.getArtistInfo(id as string);
        const { data: artistTop } = await api.getArtistTopTracks(id as string);
        artist.display_name = artist.name;
        setArtistInfo(artist);
        setArtistTopTracks(artistTop.tracks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) getArtistInfo();
  }, []);
  return (
    <div className="h-full w-full artistPage">
        {
            loading
              ? <Loader />
              : <>
                    <Header user={artistInfo} type='artist' />
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
                    </div>
                </>
        }
    </div>
  );
};

export default ArtistPage;
