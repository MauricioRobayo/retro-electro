import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMusicVideos } from "./playlistSlice";
import { RootState } from "app/store";
import PlaylistItem from "./PlaylistItem";

const Playlist: FC = () => {
  const dispatch = useDispatch();
  const { status, error, videos } = useSelector(
    (state: RootState) => state.playlist
  );
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMusicVideos());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return (
      <div>
        <p>{error || "Something unexpected just happened!"}</p>
      </div>
    );
  }
console.log(videos)
  return (
    <>
      {videos.map((video) => (
        <PlaylistItem
          title={video.snippet.title}
          thumbnail={video.snippet.thumbnails.default.url}
          channelTitle={video.snippet.channelTitle}
        />
      ))}
    </>
  );
};

export default Playlist;
