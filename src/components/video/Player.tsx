"use client"
import React, { useEffect, useRef } from 'react'
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { Video } from '@/interfaces';
import classes from './Player.module.css';

import { MediaPlayer, MediaPlayerInstance, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

const VideoPlayer = ({ id, video_path, thumbnail_path, edges, caption_path, title }: Video) => {
  const ref = useRef<MediaPlayerInstance>(null)

  useEffect(() => {
    if (edges && edges.chapters) {
      fetch(`/api/chapters/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chapters: edges.chapters }),
      }).then(res => res.json()).then(res => {
        console.log(res)
      })
    }

    ref.current!.volume = 0.15
  }, [edges, id])

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
        <DefaultVideoLayout thumbnails="http://localhost:3001/thumbnails.vtt" icons={defaultLayoutIcons} />
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