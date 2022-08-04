import { Artist as ArtistModel } from './ArtistModel';
// Styles at components/_artist.scss

const Artist = ({ artist }: {artist: ArtistModel}) => {
  return (
  <div className="artist rounded-xl py-6 px-5" key={artist.id}>
    <img className="artist__image" src={artist.images[0].url} />
    <div className="">
      <p className="artist__name font-medium mt-8 text-sm md:text-base truncate">{artist.name}</p>
      <p className="artist__name mt-1 text-xs md:text-sm text-gray">Artist</p>
    </div>
</div>
  );
};

export default Artist;
