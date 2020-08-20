import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getMusicVideos, ListSearchResult, MusicVideoSearchOptions } from 'api/youtubeAPI'
import { AppThunk } from 'app/store'

export type PlaylistStatus =
  | 'idle'
  | 'loading'
  | 'succeeded'
  | 'failed'

export interface InitialState {
  status: PlaylistStatus
  error: string | null
  videos: ListSearchResult[]
}

export const initialState: InitialState = {
  status: "idle",
  error: null,
  videos: [],
}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    fetchPlaylistSuccess(state, action: PayloadAction<ListSearchResult[]>) {
      state.status = 'succeeded'
      state.videos = action.payload
      state.error = null
    },
    fetchPlaylistFailed(state, action: PayloadAction<string>) {
      state.status = 'failed'
      state.error = action.payload 
    },
    fetchPlaylistLoading(state) {
      state.status = 'loading'
    }
  }})

export const { fetchPlaylistSuccess, fetchPlaylistFailed, fetchPlaylistLoading } = playlistSlice.actions
export default playlistSlice.reducer

export const fetchMusicVideos = (): AppThunk => async (dispatch) => {
  dispatch(fetchPlaylistLoading())
  const videoSearchOptions: MusicVideoSearchOptions = {
    q: 'retroelectro|synthwave|cyberpunk',
    maxResults: '50',
    videoDuration: 'long'
  }
  try {
    const musicVideos = await getMusicVideos(videoSearchOptions)
    dispatch(fetchPlaylistSuccess(musicVideos.items))
  } catch (e) {
    dispatch(fetchPlaylistFailed(e.toString()))
  }
}