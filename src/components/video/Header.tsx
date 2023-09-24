"use client"
import { Video } from '@/interfaces'
import { ActionIcon, Avatar, Code, Modal, Text, Title } from '@mantine/core'
import React from 'react'
import classes from './Header.module.css';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IconInfoCircle, IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
dayjs.extend(utc)

const VideoHeader = ({ title, edges, upload_date, view_count, like_count, dislike_count, format, resolution, fps, audio_codec, video_codec, abr, vbr, created_at }: Video) => {
  const [infoModalOpened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <Title order={2} title={title}>{title}</Title>
      <div className={classes.bottomRow} >
        <Link href={`/channels/${edges.channel.name}`} className={[classes.link, classes.channel].join(" ")}>
          <Avatar
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(edges.channel.image_path)}`}
            alt={edges.channel.name}
            size={32}
            radius="xl"
            mr={8}
          />
          <Text>{edges.channel.name}</Text>
        </Link>
        <div className={classes.spacer}>•</div>
        <div> {dayjs.utc(upload_date).format("YYYY/MM/DD")}</div>
        <div className={classes.spacer}>•</div>
        <div>{view_count.toLocaleString()} views</div>

        <div className={classes.right}>
          <ActionIcon onClick={open} variant='transparent' className={classes.likeIcon} color="violet">
            <IconInfoCircle size={20} />
          </ActionIcon>

          {like_count && (
            <span className={classes.likeIconParent}>
              <ActionIcon variant='transparent' className={classes.likeIcon} color="violet">
                <IconThumbUp size={20} />
              </ActionIcon>
              <Text>{like_count.toLocaleString()}</Text>
            </span>
          )}
          {dislike_count && (
            <span className={classes.likeIconParent}>
              <ActionIcon variant='transparent' className={classes.likeIcon} color="violet">
                <IconThumbDown size={20} />
              </ActionIcon>
              <Text>{dislike_count.toLocaleString()}</Text>
            </span>
          )
          }
        </div>
      </div>

      <Modal opened={infoModalOpened} onClose={close} title="Information" size="lg">
        <div>
          <Code block>
            {JSON.stringify({ format, resolution, fps, audio_codec, video_codec, abr, vbr }, null, 2)}
          </Code>
        </div>
      </Modal>
    </div>
  )
}

export default VideoHeader