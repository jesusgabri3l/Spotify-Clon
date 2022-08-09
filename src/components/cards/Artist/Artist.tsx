import { Link } from 'react-router-dom';
import { Artist as ArtistModel } from './ArtistModel';
// Styles at components/_artist.scss

const Artist = ({ artist }: {artist: ArtistModel}) => {
  return (
  <Link to={`artist/${artist.id}`}>
    <div className="card card--artist py-6 px-4" key={artist.id}>
      <img className="card__image card--artist__image" src={artist.images && artist.images[0].url} />
      <div className="">
        <p className="card__name block font-medium mt-4 text-sm truncate md:text-base">{artist.name}</p>
        <p className="artist__name mt-1 text-xs md:text-sm text-gray">Artist</p>
      </div>
  </div>
  </Link>
  );
};

export default Artist;
