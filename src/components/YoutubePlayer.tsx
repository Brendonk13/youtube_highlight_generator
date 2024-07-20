// src/components/YoutubePlayer.tsx
import React, { useEffect, useRef } from 'react';

interface YoutubeData {
  url: string;
  start_time: string;
  end_time: string;
}

const YoutubePlayer: React.FC<{ data: YoutubeData }> = ({ data }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    const player = new YT.Player(playerRef.current, {
      height: '390',
      width: '640',
      videoId: data.url.split('watch?v=')[1],
      events: {
        'onReady': onPlayerReady,
      },
    });

    function onPlayerReady(event) {
      // Assuming the timestamp format is HH:mm
      const startTime = convertTimeToSeconds(data.start_time);
      const endTime = convertTimeToSeconds(data.end_time);

      event.target.seekTo(startTime);
      event.target.playVideo();
    }

    return () => {
      player.destroy();
    };
  }, [data]);

  return <div ref={playerRef}></div>;
};

function convertTimeToSeconds(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60;
}

export default YoutubePlayer;

