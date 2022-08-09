
const Playlist = ({ album }: any) => {
  const getReleaseDate = () => {
    if (album.release_date_precision === 'year') return album.release_date;
    else if (album.release_date_precision === 'day') return getReleaseDateByDay();
    else return getReleaseDateByDay();
  };

  const getReleaseDateByDay = () => {
    const index = album.release_date.indexOf('-');
    return album.release_date.slice(0, index);
  };
  const getAlbumGroup = () => {
    return album.album_group.charAt(0).toUpperCase() + album.album_group.slice(1);
  };
  return (
  <div className="card p-4">
    <img className="card__image" src={album.images && album.images[0].url}/>
    <p className="card__name font-medium mt-5 text-base truncate">{album.name}</p>
    <p className="text-gray text-xs font-normal mt-2"> {getReleaseDate()}  • {getAlbumGroup()}</p>
  </div>
  );
};

export default Playlist;
