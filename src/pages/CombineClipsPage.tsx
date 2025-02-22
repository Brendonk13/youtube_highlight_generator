import { useState, useCallback } from 'react'
import YoutubeQueryForm from '@/components/YouTube/YouTubeQueryForm'
import YoutubePlayer from '@/components/YouTube/YoutubePlayer'
import Card from '@/components/common/Card'
import { defaultYoutubeAnswer, PostYoutubeQueryResponse } from '@/types/common'


export default function CombineClipsPage(){
  const [videoStates, setVideoStates] = useState<PostYoutubeQueryResponse[]>([])

  const setStartTime = useCallback((videoId: string, newStartTime: number) => {
    setVideoStates(prevStates =>
      prevStates.map(video =>
        video.videoId === videoId ? { ...video, startTime: newStartTime } : video
      )
    )
  }, [])

  const setEndTime = useCallback((videoId: string, newEndTime: number) => {
    setVideoStates(prevStates =>
      prevStates.map(video =>
        video.videoId === videoId ? { ...video, endTime: newEndTime } : video
      )
    )
  }, [])


  return (
    <div>
      {videoStates.map(videoState =>
        <Card>
          <YoutubeQueryForm currentAnswers={videoStates} setQueryAnswer={setVideoStates} />
          <br />
          <YoutubePlayer
            key={videoState.videoId}
            videoId={videoState.videoId}
            inputStartTime={videoState.startTime}
            inputEndTime={videoState.endTime}
            setStartTime={(newStartTime: number) => setStartTime(videoState.videoId, newStartTime)}
            setEndTime={(newEndTime: number) => setEndTime(videoState.videoId, newEndTime)}
          />
        </Card>
      )}
    </div>
  )
}
