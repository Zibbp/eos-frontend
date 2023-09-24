"use client"
import { Video } from '@/interfaces'
import React, { useEffect } from 'react'
import classes from './Description.module.css';


const VideoDescription = ({ description }: Video) => {
  const [formattedDescription, setFormattedDescription] = React.useState<string>("");

  useEffect(() => {
    const linkRegex = /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi;
    const timestampRegex = /(?:(?:([01]?\d):)?([0-5]?\d))?:([0-5]?\d)/gi;

    const formatLinks = description.replace(
      linkRegex,
      "$1<a href='$2' target='_blank' >$2</a>"
    );
    const formatTimestamps = formatLinks.replace(
      timestampRegex,
      "$1<span>$&</span>"
    );

    setFormattedDescription(formatTimestamps);
  }, [description])

  return (
    <div className={classes.description} dangerouslySetInnerHTML={{ __html: formattedDescription }}></div>
  )
}

export default VideoDescription