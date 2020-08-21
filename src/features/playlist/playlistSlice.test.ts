import reducer, {
  fetchPlaylistSuccess,
  fetchPlaylistFailed,
  fetchPlaylistLoading,
  initialState,
  InitialState,
} from "./playlistSlice";
import { ListSearchResult } from 'api/youtubeAPI'

describe("playlist reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it('should handle playlist/fetchPlaylistSuccess', () => {
    const payload: ListSearchResult[] = [
      {
        kind: "youtube#searchResult",
        etag: "abcd-1234",
        id: {
          kind: "youtube#video",
          videoId: "1234",
        },
        snippet: {
          publishedAt: "2015-11-25T00:07:11Z",
          channelId: "channelId",
          title: "title",
          description: "description",
          thumbnails: {
            default: {
              url: "thumb-1234",
              width: 1,
              height: 1
            }
          },
          channelTitle: "channelTitle",
          liveBroadcastContent: "none",
        }
      },
      {
        kind: "youtube#searchResult",
        etag: "efgh-5678",
        id: {
          kind: "youtube#video",
          videoId: "5678",
        },
        snippet: {
          publishedAt: "2017-13-22T03:00:23Z",
          channelId: "channelId",
          title: "title",
          description: "description",
          thumbnails: {
            default: {
              url: "thumb-5678",
              width: 1,
              height: 1
            }
          },
          channelTitle: "channelTitle",
          liveBroadcastContent: "none",
        }
      } 
    ]
    expect(reducer(initialState, {
      type: fetchPlaylistSuccess.type,
      payload
    })).toEqual<InitialState>({
      status: 'succeeded',
      videos: payload,
      error: null,
    })
  })

  it('should handle playlist/fetchPlaylistFailed', () => {
    const payload = 'Fetch failed'
    expect(reducer(initialState, {
      type: fetchPlaylistFailed.type,
      payload
    })).toEqual<InitialState>({
      status: 'failed',
      videos: [],
      error: payload,
    })
  })

  it('should handle playlist/fetchPlaylistLoading', () => {
    expect(reducer(initialState, {
      type: fetchPlaylistLoading.type
    })).toEqual<InitialState>({
      status: 'loading',
      videos: [],
      error: null,
    })
  })

});
