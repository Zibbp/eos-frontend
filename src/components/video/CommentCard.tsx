"use client"
import { Comment } from '@/interfaces'
import { ActionIcon, Text } from '@mantine/core'
import React, { useState } from 'react'
import classes from "./CommentCard.module.css"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { IconChevronDown, IconThumbUp } from '@tabler/icons-react'
dayjs.extend(utc)

const VideoCommentCard = ({ author, timestamp, text, like_count, replies, author_is_uploader }: Comment) => {
  const [showReplies, setShowReplies] = useState<boolean>(false)

  const toggleShowReplies = () => {
    setShowReplies(!showReplies)
  }

  return (
    <div className={classes.comment}>
      {author_is_uploader ? (
        <Text fw={500} c="yellow">{author}</Text>
      ) : (
        <Text fw={500}>{author}</Text>
      )}
      <Text size='xs' className={classes.date}>{dayjs.utc(timestamp).format("YYYY/MM/DD")}</Text>
      <Text>{text}</Text>
      <div>
        <span style={{ display: "flex" }}>
          <ActionIcon className={classes.likeIcon} variant="transparent" color='violet'>
            <IconThumbUp size={16} />
          </ActionIcon>
          <span className={classes.likeText}>
            {like_count.toLocaleString()}
          </span>
        </span>
      </div>
      {/* replies */}
      {replies && replies.length > 0 && (
        <div>
          <span
            className={classes.showReplies}
            onClick={() => toggleShowReplies()}
          >
            <ActionIcon className={classes.replyIcon} variant="transparent" color='violet'>
              <IconChevronDown size={16} />
            </ActionIcon>
            <span>Show {replies.length.toLocaleString()} replies</span>
          </span>
          {showReplies && (
            <div>
              {replies.map((reply) => (
                <div key={reply.id} className={classes.reply}>
                  <VideoCommentCard {...reply} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoCommentCard