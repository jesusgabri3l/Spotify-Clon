import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderTrackList from '../../components/layouts/Header/HeaderTrackList';
import Loader from '../../components/layouts/Loader';
import Track from '../../components/layouts/Track/Track';
import api from '../../services/api';
const AlbumPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [albumInfo, setAlbumInfo] = useState<any>();

  useEffect(() => {
    const getAlbumInfo = async () => {
      try {
        setLoading(true);
        const { data } = await api.getAlbumInfo(id as string);
        setAlbumInfo(data);
      } catch (err: any) {
        if (err.response.status === 400 || err.response.status === 404) navigate('/');
      } finally {
        setLoading(false);
      }
    };
    if (id) getAlbumInfo();
    else navigate('/');
  }, []);
  return (
    <div className="w-full h-full albumPage">
      {
        loading
          ? <Loader />
          : <>
            <HeaderTrackList info={albumInfo} />
            <div className="px-6 md:px-12">
            <section className="albumPage__trackList mt-6">
              <div className="home__content__tracks__content mt-2">
                {albumInfo.tracks.items.map((track: any, index: number) => <Track
                track={track} index={index + 1} key={track.id} showImage={false} showAlbum={false} />
                )}
              </div>
            </section>
            <section className="albumPage__copyright mt-12">
              <p className="text-sm text-gray font-medium">{albumInfo.release_date}</p>
              {albumInfo.copyrights.map((copyright: any) =>
              <p className="text-sm text-gray text-xs mt-2" key={copyright.text} >{copyright.text}</p>
              )}
            </section>

            </div>
        </>
      }
    </div>
  );
};

export default AlbumPage;
