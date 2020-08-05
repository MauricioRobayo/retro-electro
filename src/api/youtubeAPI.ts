const URL = 'https://www.googleapis.com/youtube/v3/'
const API_KEY = 'AIzaSyAI_CxS93BYglKgJPBrVQK1t3m3VIeKSBc'

enum VideoCategory {
  MUSIC = '10'
}

export interface SearchListResponse {
  kind: "youtube#searchListResponse";
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ListSearchResult[];
}

export interface VideoListResponse {
  kind: "youtube#videoListResponse",
  etag: string
  nextPageToken: string
  prevPageToken: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: VideoSearchResult[]
}

export interface SearchResult {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: string
    videoId: string
    channelId?: string
    playlistId?: string
  }
}

export interface ListSearchResult extends SearchResult { 
  snippet: ListSnippet
}

export interface VideoSearchResult extends SearchResult {
  snipped: VideoSnippet
}

interface ListSnippet {
  publishedAt: Date
  channelId: string
  title: string
  description: string
  thumbnails: {
    default: string
    medium?: string
    high?: string
    standard?: string
    maxres?: string
  }
  channelTitle: string
  liveBroadcastContent: string
}

interface VideoSnippet extends ListSnippet {
  tags: string[]
  categoryId: string
  defaultLanguage: string
  localized: {
    title: string
    description: string
  }
  defaultAudioLanguage: string
}

export interface MusicVideoSearchOptions {
  q: string
  maxResults?: string
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount'
  videoDuration?: 'any' | 'long' | 'medium' | 'short'
}

export const getMusicVideos = async ({
  q,
  maxResults = '5',
  order = 'relevance',
  videoDuration = 'any',
}: MusicVideoSearchOptions): Promise<SearchListResponse> => {  
  const searchParams = new URLSearchParams({
    q,
    maxResults,
    order,
    videoDuration,
    type: 'video',
    part: 'snippet',
    key: API_KEY,
    videoCategoryId: VideoCategory.MUSIC,
  })
  const response = await fetch(`${URL}search?${searchParams}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export const getVideoInfo = async (id: string): Promise<SearchResult> => {
  const searchParams = new URLSearchParams({
    id,
    part: 'snippet',
    key: API_KEY,
  })
  const response = await fetch(`${URL}search?${searchParams}`)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}
