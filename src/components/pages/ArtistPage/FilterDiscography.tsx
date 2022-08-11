import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import Album from '../../cards/Album/Album';
import Loader from '../../layouts/Loader';
const FilterDiscography = ({ id = '' }: {id?: string}) => {
  const [items, setItems] = useState<any>();
  const [albums, setAlbums] = useState<any>();
  const [singles, setSingles] = useState<any>();
  const [compilations, setCompilations] = useState<any>();
  const [filterDiscography, setFilterDiscography] = useState<any>('album');
  const [loading, setLoading] = useState<boolean>(true);

  const handleFilterDiscographyClick = (filter: string) => {
    setFilterDiscography(filter);
    if (filter === 'album') setItems(albums);
    if (filter === 'single') setItems(singles);
    if (filter === 'compilation') setItems(compilations);
  };
  const getDiscographyInfo = async () => {
    try {
      const { data: albumsResponse } = await api.getArtistInfo(id as string, '/albums/?include_groups=album&limit=6');
      const { data: singleResponse } = await api.getArtistInfo(id as string, '/albums/?include_groups=single&limit=6');
      const { data: compilationsResponse } = await api.getArtistInfo(id as string, '/albums/?include_groups=compilation&limit=6');

      setItems(albumsResponse.items);
      setAlbums(albumsResponse.items);
      setSingles(singleResponse.items);
      setCompilations(compilationsResponse.items);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDiscographyInfo();
  }, [id]);
  return (
        <section className="mt-14">
                          <h3 className="text-xl mb-2 font-bold mb-6 md:text-2xl">Discography</h3>
                          {
                            loading
                              ? <Loader />
                              : <>
                            <div className="pl-2 flex items-center justify-between pr-6 flex-wrap">
                              <div className="flex items-center gap-x-5 flex-wrap">
                                <button onClick={() => handleFilterDiscographyClick('album')}
                                className={`px-4 py-2 text-xs font-medium 
                                ${filterDiscography === 'album' ? 'bg-white rounded-xl text-black' : 'element_wrapper'}`}>
                                    ALBUMS
                                </button>
                                <button onClick={() => handleFilterDiscographyClick('single')}
                                className={`px-4 py-2 text-xs font-medium 
                                ${filterDiscography === 'single' ? 'bg-white rounded-xl text-black' : 'element_wrapper'}`}>
                                    SINGLES
                                </button>
                                {
                                  compilations.length > 0 &&
                                  <button onClick={() => handleFilterDiscographyClick('compilation')}
                                  className={`px-4 py-2 text-xs font-medium 
                                  ${filterDiscography === 'compilation' ? 'bg-white rounded-xl text-black' : 'element_wrapper'}`}>
                                      COMPILATIONS
                                  </button>
                                }
                              </div>
                                <Link to={`/artist/${id}/discography`}
                                className="text-gray text-xs font-bold float-right mt-5 md:mt-0">
                                  SEE ALL DISCOGRAPHY
                                </Link>
                            </div>
                            <div className="flex items-center justify-start flex-wrap gap-y-5 gap-x-7 mt-8">
                                {items.length > 0
                                  ? items.map((album: any) => <Album key={album.id} album={album} />)
                                  : <div className="element_wrapper w-full px-4 py-3" role="alert">
                                      <div className="flex">
                                        <div className="py-1">
                                          <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                                          <div>
                                              <p className="font-bold"></p>
                                              <p className="text-sm">Hey! Looks like this artist does not have this information yet.</p>
                                          </div>
                                      </div>
                                </div>}
                            </div>
                            </>
                          }

                      </section>
  );
};

export default FilterDiscography;
