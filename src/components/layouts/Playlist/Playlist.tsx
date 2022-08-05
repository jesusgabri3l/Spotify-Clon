import { Playlist as PlaylistModel } from './PlaylistModel';
const Playlist = ({ playlist }: {playlist: PlaylistModel}) => {
  return (
  <div className="playlist p-4 rounded-xl">
    <img className="playlist__image rounded-xl" src={playlist.images && playlist.images[0].url}/>
    <p className="playlist__name font-medium mt-5 text-base truncate">{playlist.name}
    <span className="text-gray text-sm font-normal"> • {playlist.tracks.total} tracks</span>
    </p>
  </div>
  );
};

export default Playlist;
