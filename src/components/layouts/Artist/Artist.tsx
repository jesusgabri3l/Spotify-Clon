import { Artist as ArtistModel } from './ArtistModel';
// Styles at components/_artist.scss

const Artist = ({ artist }: {artist: ArtistModel}) => {
  return (
  <div className="artist rounded-xl py-6" key={artist.id}>
    <img className="artist__image" src={artist.images[0].url} />
    <div className="pl-4">
      <p className="artist__name font-medium mt-5 text-sm md:text-base">{artist.name}</p>
      <p className="artist__name mt-2 text-xs md:text-sm text-gray">Artist</p>
    </div>
</div>
  );
};

export default Artist;
