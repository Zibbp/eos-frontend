"use client"
import { Comment, Video } from '@/interfaces'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import VideoCommentCard from './CommentCard'
import { Center, Pagination, Title } from '@mantine/core'

async function getComments(id: string, page: number, limit: number) {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments?limit=${limit}&offset=${(page - 1) * limit
    }&video_id=${id}`).then((res) => res.data)
}

const VideoComments = ({ id, comment_count }: Video) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState<number>(30)
  const [total, setTotal] = useState(1)
  const comments = useRef<HTMLHeadingElement>(null)

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", id, page, limit],
    queryFn: () => getComments(id, page, limit),
    keepPreviousData: true,
  })

  // Update the total page count when data changes
  useEffect(() => {
    if (!data) return
    setTotal(data.pages)
  }, [data])

  const setCommentPage = (page: number) => {
    setPage(page)
    if (comments.current) {
      comments.current.scrollIntoView({ behavior: "smooth" })
    }

  }

  if (error) return <div>Error loading comments</div>

  return (
    <div>
      <Title ref={comments} order={3} mt="sm" mb="sm">{comment_count.toLocaleString()} Comments</Title>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data.data.length > 0 ? (
              <div>
                {data.data.map((comment: Comment) => (
                  <VideoCommentCard key={comment.id} {...comment} />
                ))}
              </div>
            ) : (
              <div>No comments</div>
            )}
            <Center mt="sm" pb="lg">
              <Pagination
                value={page}
                onChange={setCommentPage}
                total={total}
              />
            </Center>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoComments