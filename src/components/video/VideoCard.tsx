import { Video, PlaybackData } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Badge, Button, Group, Tooltip, AspectRatio, Progress, ThemeIcon } from '@mantine/core';
import classes from './VideoCard.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from "dayjs/plugin/duration";
import { useHover } from '@mantine/hooks';
import { IconCircleCheck } from '@tabler/icons-react';
dayjs.extend(duration);
dayjs.extend(utc)

const numFormatter = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

const VideoCard = ({ id, title, thumbnail_path, duration, upload_date, view_count, playbackData }: Video & { playbackData: PlaybackData[] }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { hovered, ref } = useHover();
  const [watched, setWatched] = useState(false);
  const [watchedPercent, setWatchedPercent] = useState(0);

  // Set watched and watchedPercent
  useEffect(() => {
    if (!playbackData) return
    const playback: PlaybackData | undefined = playbackData.find((p) => p.video_id === id)
    if (!playback) return
    if (playback.status == "finished") {
      setWatched(true)
    }
    const progress = playback.timestamp / duration * 100
    setWatchedPercent(progress)

  }, [playbackData, id, duration])

  const preloadImage = (url: string) => {
    const image = new window.Image();
    image.src = url;
  }

  useEffect(() => {
    preloadImage(
      `${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(
        thumbnail_path
      )}`
    );
  }, [thumbnail_path]);

  return (
    <div ref={ref}>
      <Card p={0} radius={0} className={classes.card}>
        <Card.Section>
          <div
            className={`${hovered ? classes.hovered : ""} ${classes.outerImage
              }`}
          >
            <AspectRatio ratio={16 / 9} >
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(thumbnail_path)}`}
                alt={title}
                fallbackSrc='/images/404-thumbnail.webp'
                className={`${classes.image} ${hovered ? classes.imageHover : ""
                  }`}
              />
            </AspectRatio>
            {Math.round(watchedPercent) > 0 && !watched && (
              <Tooltip label={`${Math.round(watchedPercent)}% watched`}>
                <Progress className={classes.progressBar} color="red" size="sm" value={watchedPercent} />
              </Tooltip>
            )}
          </div>
        </Card.Section>

        <Badge py={0} px={5} className={classes.durationBadge} radius="xs">
          <Text mt={1}>
            {dayjs
              .duration(duration, "seconds")
              .format("HH:mm:ss")
              .replace(/^00:/, "")}
          </Text>
        </Badge>

        {watched && (
          <Tooltip label="Watched">
            <ThemeIcon className={classes.watchedIcon} radius="xl" color="green">
              <IconCircleCheck />
            </ThemeIcon>
          </Tooltip>
        )}

        <Text lineClamp={2} size="xl" mt={2}>
          <Tooltip
            inline
            openDelay={500}
            closeDelay={100}
            multiline
            label={title}
          >
            <span>{title}</span>
          </Tooltip>
        </Text>

        <div className={classes.infoBar}>
          <Tooltip
            label={`Uploaded At ${new Date(
              upload_date
            ).toLocaleString()}`}
          >
            <Text className={classes.infoBarText} size='md'>
              {dayjs.utc(upload_date).format("YYYY/MM/DD")}
            </Text>
          </Tooltip>
          <div className={classes.infoBarRight}>
            <Tooltip label={`${view_count.toLocaleString()} Views`}>
              <Text size="md">{numFormatter(view_count)} views</Text>
            </Tooltip>
          </div>
        </div>

      </Card>
    </div >
  )
}

export default VideoCard