export interface Channel {
  id: string;
  name: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  edges: object;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  upload_date: string;
  uploader: string;
  duration: number;
  view_count: number;
  like_count: number;
  dislike_count: number;
  format: string;
  width: number;
  height: number;
  resolution: string;
  fps: number;
  audio_codec: string;
  video_codec: string;
  abr: number;
  vbr: number;
  epoch: number;
  comment_count: number;
  video_path: string;
  thumbnail_path: string;
  json_path: string;
  caption_path: string;
  path: string;
  created_at: string;
  updated_at: string;
}
