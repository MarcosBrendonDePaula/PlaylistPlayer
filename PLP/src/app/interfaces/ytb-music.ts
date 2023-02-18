import {YtbMusicProgress} from './ytb-music-progress'

export interface YtbMusic {
    videoId: string,
    progress: YtbMusicProgress | null,
    stats: string

    file?: string | null,
    youtubeUrl?: string | null,
    videoTitle?: string | null,
    artist?: string | null,
    title?: string | null,
    thumbnail?: string | null,
}
