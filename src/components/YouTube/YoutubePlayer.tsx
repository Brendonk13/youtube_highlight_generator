import React, { useEffect, useRef } from 'react'

interface YoutubeData {
  videoId: string
  startTime: number
  endTime: number
}

// const YoutubePlayer: React.FC<{ data: YoutubeData }> = ({ data }) => {
export default function YoutubePlayer({videoId, startTime, endTime} : YoutubeData){
  const playerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (!playerRef.current) return

    const player = new YT.Player(playerRef.current, {
      // height: '390',
      // width: '640',
      height: '300',
      width: '492',
      videoId: videoId,
      // events: {
      //   'onReady': onPlayerReady,
      // },
      events: {
        onReady: (event) => {
          event.target.seekTo(startTime);
          event.target.playVideo();
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
              if (player.getCurrentTime() >= endTime) {
                player.pauseVideo();
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                }
              }
            }, 100); // check every 100ms
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }
        },
      },
    })

    // function onPlayerReady(event) {
    //   // const startTime = convertTimeToSeconds(data.startTime)
    //   // const endTime = convertTimeToSeconds(data.endTime)
    //   event.target.seekTo(startTime)
    //   event.target.playVideo()
    //   const duration = (endTime - startTime) * 1000 // duration in milliseconds
    //   // timeoutRef.current = setTimeout(() => {
    //   //   event.target.pauseVideo()
    //   // }, duration)
    // }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [videoId, startTime, endTime])

  return <div ref={playerRef}></div>
}

// function convertTimeToSeconds(time: string): number {
//   const [hours, minutes] = time.split(':').map(Number);
//   return hours * 3600 + minutes * 60;
// }
