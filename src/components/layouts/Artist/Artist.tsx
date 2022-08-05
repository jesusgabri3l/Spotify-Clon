import { Link } from 'react-router-dom';
import { Artist as ArtistModel } from './ArtistModel';
// Styles at components/_artist.scss

const Artist = ({ artist }: {artist: ArtistModel}) => {
  return (
  <div className="artist rounded-xl py-6 px-4" key={artist.id}>
    <img className="artist__image" src={artist.images && artist.images[0].url} />
    <div className="">
      <Link to={`artist/${artist.id}`} className="artist__name block font-medium mt-6 text-sm truncate md:text-base hover:underline">{artist.name}</Link>
      <p className="artist__name mt-1 text-xs md:text-sm text-gray">Artist</p>
    </div>
</div>
  );
};

export default Artist;
