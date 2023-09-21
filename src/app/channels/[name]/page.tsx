import VideoLayout from '@/components/channel/VideoLayout'
import { Channel } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'


async function getChannel(name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/channels/name/${name}`)
  if (!res.ok) {
    throw new Error(`Error fetching channel`)
  }

  return res.json() as Promise<Channel>
}

const ChannelPage = async ({ params }: { params: { name: string } }) => {

  const channel = await getChannel(params.name)

  return (
    <div>
      <div>{channel.name}</div>
      <div>
        <VideoLayout channel={channel} />
      </div>
    </div>
  )
}

export default ChannelPage
