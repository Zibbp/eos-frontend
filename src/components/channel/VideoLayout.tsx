"use client"
import { Channel } from '@/interfaces'
import { Grid, Group, NumberInput, Pagination, Select, SimpleGrid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import VideoCard from '../video/VideoCard'
import Link from 'next/link'

async function getVideos(channelId: string, page: number, limit: number) {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/videos?limit=${limit}&offset=${(page - 1) * limit
    }&channel_id=${channelId}`).then((res) => res.data)
}


const VideoLayout = ({ channel }: { channel: Channel }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState<number>(30)
  const [total, setTotal] = useState(1)
  const [loaded, isLoaded] = useState(false)

  const { data, error, isLoading, isError, isFetching } = useQuery({
    queryKey: ["videos", channel.id, page, limit],
    queryFn: () => getVideos(channel.id, page, limit),
  })

  // Update the total page count when data changes
  useEffect(() => {
    if (!data) return
    setTotal(data.pages)
  }, [data])

  // Update the URL if needed
  useEffect(() => {
    router.replace(`?page=${page}&limit=${limit}`, { scroll: false })
  }, [router, page, limit])

  // Set the page from the URL if loaded
  useEffect(() => {
    const browserPage = parseInt(searchParams.get('page') || '1', 10)
    setPage(browserPage)
    const browserLimit = parseInt(searchParams.get('limit') || '30', 10)
    setLimit(browserLimit)
    isLoaded(true)
  }, [searchParams, isLoaded])

  // get playback data
  const { data: playbackData } = useQuery({
    queryKey: ["playback-data"],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/playback`).then((res) => res.data),
  })

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <Grid>
            {data.data.map((video: any) => (
              <Grid.Col key={video.id} span={{ md: 6, lg: 2 }}>
                <Link href={`/videos/${video.id}`} style={{ textDecoration: "none" }}>
                  <VideoCard  {...video} playbackData={playbackData} />
                </Link>
              </Grid.Col>
            ))}
          </Grid>
        </div>
      )}
      <Group justify="center" pb="lg">
        <Pagination
          value={page}
          onChange={setPage}
          total={total} color="violet" withEdges />
        <NumberInput value={limit} onChange={(value: number | string) => setLimit(Number(value))} min={30} step={30} />
      </Group>


    </div>
  )
}

export default VideoLayout