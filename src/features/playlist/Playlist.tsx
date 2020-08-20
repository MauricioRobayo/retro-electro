import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { fetchMusicVideos } from './playlistSlice';
import { RootState } from 'app/store'
import { htmlUnescape } from 'escape-goat'


const Playlist: FC = () => {
  const dispatch = useDispatch();
  const { status, error, videos } = useSelector((state: RootState) => state.playlist)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMusicVideos())
    }
  }, [dispatch, status])
  
  if (status === 'failed') {
    return (<div>
      <p>{error || 'Something unexpected just happened!'}</p>
    </div>)
  }

  console.log(videos)
  return (
    <ul>
      {videos.map((video) => <li key={video.id.videoId}>{htmlUnescape(video.snippet.title)}</li>)}
    </ul>
  );
}

export default Playlist