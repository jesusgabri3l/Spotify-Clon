import { Props } from './TrackModel';
const Track = ({ track, index, type = 'default' }: Props) => {
  const concataneArtists = (artists: any[]) => {
    const concatanedArtists = artists.map((artist: any) => artist.name).join(', ');
    return <p className="toptrack__mainInfo__naming__name text-xs text-gray mt-1">{concatanedArtists}</p>;
  };

  const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < '10' ? '0' : '') + seconds;
  };

  return (
<div className="toptrack py-2 px-5 rounded-xl flex justify-between items-center mt-1" key={track.id}>
                <div className="toptrack__mainInfo flex items-center gap-x-5 basis-full md:basis-2/6">
                  <p className="toptrack__mainInfo__number text-gray">{index + 1}</p>
                  <img src={track.album.images[2].url} className="toptrack__mainInfo__img rounded-2xl"/>
                  <div className="toprack__mainInfo__naming">
                    <p className="toptrack__mainInfo__naming__name font-medium">{track.name}</p>
                    {type === 'default' ? concataneArtists(track.artists) : track.explicit && <p className='text-gray uppercase mt-2 text-xs'>explicit</p>}
                  </div>
                </div>
                <p className="toptrack__album text-sm hidden md:block text-gray text-left basis-1/6">{track.album.name}</p>
                <p className="toptrack__album text-sm text-gray hidden md:block text-right basis-1/6">
                  {millisToMinutesAndSeconds(track.duration_ms as number)}
                </p>
              </div>
  );
};

export default Track;
