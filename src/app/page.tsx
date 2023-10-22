"use client"
import React from 'react'

import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import { Channel } from '@/interfaces'
import ChannelCard from '@/components/channel/ChannelCard'
import { Container, Group, SimpleGrid, rem } from '@mantine/core'

type Props = {}

const Channels = (props: Props) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/channels`)
      return data as Channel[]
    },
  })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <Container size="130rem">
      <Group mt="sm">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4, lg: 5, xl: 6 }}>
          {data && data.map((channel) => (
            <ChannelCard key={channel.id} {...channel} />
          ))}
        </SimpleGrid>
      </Group>
    </Container>
  )
}

export default Channels