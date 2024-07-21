import React, { useState, useEffect, useRef } from 'react'

function convertFromSeconds(seconds: number): string {
  if (seconds < 0) {
    throw new Error("Seconds must be a non-negative integer.");
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${hours}:${minutes}:${secs}`
}

function convertToSeconds(time: string): number {
  const [hoursStr, minutesStr, secondsStr] = time.split(":");

  const hours = parseInt(hoursStr.trim(), 10);
  const minutes = parseInt(minutesStr.trim(), 10);
  const seconds = parseInt(secondsStr.trim(), 10);

  // Validate the parsed values
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
      hours < 0 || minutes < 0 || minutes >= 60 || seconds < 0 || seconds >= 60) {
    throw new Error("Invalid time format or values. Ensure time is in 'h:m:s' and values are in valid ranges.");
  }

  // Calculate total seconds
  return hours * 3600 + minutes * 60 + seconds
}



interface YoutubeData {
  videoId: string
  inputStartTime: number
  inputEndTime: number
  setStartTime: (time: number) => void
  setEndTime: (time: number) => void
}

// const YoutubePlayer: React.FC<{ data: YoutubeData }> = ({ data }) => {
export default function YoutubePlayer({videoId, inputStartTime, inputEndTime, setStartTime, setEndTime} : YoutubeData){
  const playerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  let startTime = inputStartTime
  let endTime = inputEndTime

  // allow the user to set adjust start and end time

  console.log(`start: ${startTime}, end: ${endTime}`)

  useEffect(() => {
    if (!playerRef.current) return

    const player = new YT.Player(playerRef.current, {
      // todo: adjust for breakpoints
      videoId,
      height: '300',
      width: '492',
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

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [videoId, startTime, endTime])


  return (
    <div className="flex flex-row items-start space-x-4">
      <div className="bg-blue-200">left</div>
      {/* <div className="flex flex-col space-y-2"> */}
      {/*   <input */}
      {/*     type="text" */}
      {/*     value={convertFromSeconds(startTime)} */}
      {/*     // onChange={time => setStartTime(videoState.videoId, convertToSeconds(time.target.value))} */}
      {/*     // onChange={time => setStartTime(videoState.videoId, convertToSeconds(time.target.value))} */}
      {/*     // need a button to submit times so that it only switches start time when u click, not when u edit */}
      {/*     placeholder="Start Time" */}
      {/*     className="p-8 border rounded" */}
      {/*   /> */}
      {/*   <button>Submit</button> */}
      {/* </div> */}

      {/* <div ref={playerRef} className="flex-shrink-0"></div> */}
      <div> ascjknaskjcnasjkcnsakjldncklasdnc</div>

      <div>right</div>
      {/* <div className="flex flex-col space-y-2"> */}
      {/*   <input */}
      {/*     type="text" */}
      {/*     value={convertFromSeconds(endTime)} */}
      {/*     onChange={time => setEndTime(videoId, convertToSeconds(time.target.value))} */}
      {/*     placeholder="End Time" */}
      {/*     className="p-8 border rounded" */}
      {/*   /> */}
      {/*   <button>Submit</button> */}
      {/* </div> */}
    </div>
  )
}
