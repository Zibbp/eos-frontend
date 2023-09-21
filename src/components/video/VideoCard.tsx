import { Video } from '@/interfaces'
import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import classes from './VideoCard.module.css';

type Props = {}

const VideoCard = ({ title, thumbnail_path }: Video) => {
  return (
    <div>
      <Card p={0} radius={0} className={classes.card}>
        <Card.Section>
          <Image
            src={`${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(thumbnail_path)}`}
            alt="Norway"
          />
        </Card.Section>

        <Text lineClamp={2} w={500}>
          <span>{title}</span>
        </Text>
      </Card>
    </div>
  )
}

export default VideoCard