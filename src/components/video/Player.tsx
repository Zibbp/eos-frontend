"use client"
import React, { useEffect, useRef } from 'react'
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { Video } from '@/interfaces';
import classes from './Player.module.css';

import { MediaPlayer, MediaPlayerInstance, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import axios from 'axios';

const VideoPlayer = ({ id, video_path, thumbnail_path, edges, caption_path, title, thumbnails_path }: Video) => {
  const ref = useRef<MediaPlayerInstance>(null)
  const [thumbnailsBlobUrl, setThumbnailsBlobUrl] = React.useState("")

  useEffect(() => {
    if (edges && edges.chapters) {
      try {
        fetch(`/api/chapters/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chapters: edges.chapters }),
        }).then(res => res.json()).then(res => {
          console.log(res)
        })
      } catch (e) {
        console.error(e)
        throw new Error(`Error fetching chapters: ${e}`)
      }
    }

    ref.current!.volume = 0.15
  }, [edges, id])

  useEffect(() => {
    if (thumbnails_path) {
      try {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/videos/generate_thumbnails_vtt`, {
          "video_id": id,
          "cdn_url": process.env.NEXT_PUBLIC_CDN_URL
        }).then((res) => {
          console.debug(res.data)
          // create blob url of res.data
          const blob = new Blob([res.data], { type: 'text/vtt' })
          const url = URL.createObjectURL(blob)
          setThumbnailsBlobUrl(url)
        })
      } catch (e) {
        console.error(e)
        throw new Error(`Error fetching thumbnails: ${e}`)
      }

    }
  }, [id, thumbnails_path])

  return (
    <div className={classes.playerContainer}>

      <MediaPlayer ref={ref}
        src={[{ src: `${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(video_path)}`, type: 'video/webm' }]}
        crossorigin
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(thumbnail_path)}`}
            alt={title}
          />
          <Track
            src={`/api/chapters/${id}`}
            kind='chapters'
            language="en-US"
            default={true}
          />
        </MediaProvider>
        <DefaultVideoLayout thumbnails={thumbnailsBlobUrl} icons={defaultLayoutIcons} />
      </MediaPlayer>
      {/* <MediaPlayer
        className={classes.playerContainer}
        title={title}
        src={[{ src: `${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(video_path)}`, type: 'video/webm' }]}
        poster={`${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(thumbnail_path)}`}
        // thumbnails="https://media-files.vidstack.io/sprite-f ight/thumbnails.vtt"
        aspectRatio={16 / 9}
        crossorigin=""
        ref={player}
      >
        <MediaOutlet className={classes.playerMediaOutlet}>
          <track
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(caption_path)}`}
            label="English"
            srcLang="en-US"
            kind="subtitles"
          />
          {edges && edges.chapters && <track
            src={`/api/chapters/${id}`}
            srcLang="en-US"
            kind="chapters"
            default
          />}
        </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer> */}

    </div>
  )
}

export default VideoPlayer