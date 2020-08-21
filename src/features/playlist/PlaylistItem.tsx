import React, { FC } from "react";
import { htmlUnescape } from "escape-goat";
import PropTypes, { InferProps } from "prop-types";


const playlistItemProps = {
  title: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
}

type PlaylistProps = InferProps<typeof playlistItemProps>

const PlaylistItem: FC<PlaylistProps> = ({
  title,
  channelTitle,
}) => (
  <article>
    <header>
      <h2>{htmlUnescape(title)}</h2>
    </header>
    <p>{channelTitle}</p>
  </article>
);

PlaylistItem.propTypes = playlistItemProps

export default PlaylistItem;