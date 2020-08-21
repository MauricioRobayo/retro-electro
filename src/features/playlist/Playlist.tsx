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

  return (
    <>
      {videos.map((video) => (
        <PlaylistItem
          key={video.id.videoId}
          title={video.snippet.title}
          channelTitle={video.snippet.channelTitle}
        />
      ))}
    </>
  );
};

export default Playlist;
