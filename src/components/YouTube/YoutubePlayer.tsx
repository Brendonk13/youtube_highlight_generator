import React, { useEffect, useRef } from 'react'

interface YoutubeData {
  videoId: string
  startTime: number
  endTime: number
}

// const YoutubePlayer: React.FC<{ data: YoutubeData }> = ({ data }) => {
export default function YoutubePlayer({videoId, startTime, endTime} : YoutubeData){
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!playerRef.current) return

    const player = new YT.Player(playerRef.current, {
      height: '390',
      width: '640',
      // videoId: videoId.split('watch?v=')[1],
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
      },
    })

    function onPlayerReady(event) {
      // const startTime = convertTimeToSeconds(data.startTime)
      // const endTime = convertTimeToSeconds(data.endTime)

      event.target.seekTo(startTime)
      event.target.playVideo()
    }

    return () => {
      player.destroy()
    };
  }, [videoId, startTime, endTime])

  return <div ref={playerRef}></div>
}

// function convertTimeToSeconds(time: string): number {
//   const [hours, minutes] = time.split(':').map(Number);
//   return hours * 3600 + minutes * 60;
// }
