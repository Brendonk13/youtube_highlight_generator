import { useState } from 'react'
import YoutubeQueryForm from '@/components/YouTube/YouTubeQueryForm'
import YoutubePlayer from '@/components/YouTube/YoutubePlayer'
import { defaultYoutubeAnswer, PostYoutubeQueryResponse } from '@/types/common'


export default function CombineClipsPage(){
  const [videos, setVideos] = useState<PostYoutubeQueryResponse[]>([])

  return (
    <div>
      <YoutubeQueryForm currentAnswers={videos} setQueryAnswer={setVideos} />
      {videos.map(video => {
        return <YoutubePlayer videoId={video.videoId} startTime={video.startTime} endTime={video.endTime} />
      })}
    </div>
  )
}
