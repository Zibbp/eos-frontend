"use client"
import React, { useEffect, useRef } from 'react'
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from '@vidstack/react';
import { Video } from '@/interfaces';
import { MediaPlayerElement } from 'vidstack';
import classes from './Player.module.css';

const VideoPlayer = ({ id, video_path, thumbnail_path, edges, caption_path, title }: Video) => {
  const player = useRef<MediaPlayerElement>(null);

  if (edges && edges.chapters) {
    useEffect(() => {
      fetch(`/api/chapters/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chapters: edges.chapters }),
      }).then(res => res.json()).then(res => {
        console.log(res)
      })
    }, [])
  }

  return (
    <div className={classes.playerContainer}>
      <MediaPlayer
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
      </MediaPlayer>

    </div>
  )
}

export default VideoPlayer