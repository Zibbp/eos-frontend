import VideoLayout from '@/components/channel/VideoLayout'
import { Channel } from '@/interfaces'
import { Center, Container, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'


async function getChannel(name: string) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/channels/name/${name}`)
    return res.data as Channel
  } catch (e) {
    console.error(e)
    throw new Error(`Error fetching channel: ${e}`)
  }
}

const ChannelPage = async ({ params }: { params: { name: string } }) => {

  const channel = await getChannel(params.name)

  return (
    <div>
      <Container size="xl" px="xl" fluid={true}>
        <Center mb="sm">
          <Title>{channel.name}</Title>
        </Center>
        <div>
          <VideoLayout channel={channel} />
        </div>
      </Container>
    </div>
  )
}

export default ChannelPage
