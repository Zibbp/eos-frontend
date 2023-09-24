import VideoComments from '@/components/video/Comments'
import VideoDescription from '@/components/video/Description'
import VideoHeader from '@/components/video/Header'
import VideoPlayer from '@/components/video/Player'
import { Video } from '@/interfaces'
import { Container } from '@mantine/core'
import React from 'react'

async function getVideo(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/videos/${id}`)
  if (!res.ok) {
    throw new Error(`Error fetching video`)
  }

  return res.json() as Promise<Video>
}

const VideoPage = async ({ params }: { params: { id: string } }) => {

  const video = await getVideo(params.id)

  // POST chapter data to API to create a URL for the player to consume
  // player doesn't accept blob urls for tracks so this is the workaround :/
  // if (video.edges && video.edges.chapters) {
  //   const res = await fetch(`/api/chapters/${video.id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ chapters: video.edges.chapters }),
  //   })
  //   console.log(res)
  // }

  return (
    <Container size="130rem">
      <div style={{ marginTop: "1rem" }}>
        <VideoPlayer {...video} />
      </div>
      <div>
        <VideoHeader {...video} />
      </div>
      <div>
        <VideoDescription {...video} />
      </div>
      <div>
        <VideoComments {...video} />
      </div>

    </Container>
  )
}

export default VideoPage