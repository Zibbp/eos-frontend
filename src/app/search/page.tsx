"use client"
import VideoCard from '@/components/video/VideoCard'
import { Container, Grid, Group, NumberInput, Pagination } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  searchParams: searchParams
}

type searchParams = {
  q: string
}

async function getVideos(searchTerm: string, page: number, limit: number) {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/videos/search?q=${searchTerm}&limit=${limit}&offset=${(page - 1) * limit
    }`).then((res) => res.data)
}

const SearchPage = (props: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState<number>(30)
  const [total, setTotal] = useState(1)
  const [searchTerm, setSearchTerm] = useState<string>(props.searchParams.q)

  useEffect(() => {
    setSearchTerm(props.searchParams.q)
  }, [props.searchParams.q])

  const { data, error, isLoading, isError, isFetching } = useQuery({
    queryKey: ["videos-search", searchTerm, page, limit],
    queryFn: () => getVideos(searchTerm, page, limit),
    keepPreviousData: true,
  })

  // Update the total page count when data changes
  useEffect(() => {
    if (!data) return
    setTotal(data.pages)
  }, [data])

  return (
    <div>
      <Container size="xl" px="xl" fluid={true}>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error as React.ReactNode}</div>
        ) : (
          <div>
            <Grid>
              {data.data.map((video: any) => (
                <Grid.Col key={video.id} span={{ md: 6, lg: 2 }}>
                  <Link href={`/videos/${video.id}`} style={{ textDecoration: "none" }}>
                    <VideoCard  {...video} />
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

      </Container>
    </div>
  )
}

export default SearchPage