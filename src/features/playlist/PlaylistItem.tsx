import React, { FC } from 'react'
import { htmlUnescape } from 'escape-goat'

interface Props {
  title: string
  thumbnail: string
  channelTitle: string
}

const PlaylistItem: FC<Props> = ({ title, thumbnail, channelTitle}) => (
  <article>
    <header>
      <img src={thumbnail} alt={title} />
      <h2>{htmlUnescape(title)}</h2>
    </header>
    <p>{channelTitle}</p>
  </article>
)

export default PlaylistItem