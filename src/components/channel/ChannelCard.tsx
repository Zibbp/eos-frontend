import { Channel } from '@/interfaces'
import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import classes from './ChannelCard.module.css';
import Link from 'next/link';


const ChannelCard = ({ name, image_path }: Channel) => {

  const image_url = `${process.env.NEXT_PUBLIC_CDN_URL}${encodeURIComponent(image_path)}`

  return (
    <Link className={classes.link} href={`/channels/${name}`}>
      <Card className={classes.card} shadow="sm" padding="lg" radius="md" >
        <Card.Section>
          <Image
            src={image_url}
            alt="Norway"
            fallbackSrc="/images/channel_image.png"
          />
        </Card.Section>

        <Group justify="center">
          <Text fw={500} fz={24} mt="sm">{name}</Text>
        </Group>
      </Card>
    </Link>
  )
}

export default ChannelCard