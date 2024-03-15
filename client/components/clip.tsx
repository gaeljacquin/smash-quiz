'use client';

import Image from 'next/image';
import { type LegacyRef, useEffect, useRef, useState } from 'react';
import YouTube, { type YouTubePlayer } from 'react-youtube';

import useGameStore from '@/stores/gameStore';
import BaseButton from '@/components/buttons/base';
import TextSpecial from '@/components/text-special';
import calculateScore from '@/utils/functions/calculate-score';
import CharacterBadge from '@/components/character-badge';

interface YouTubePlayerType {
  internalPlayer: {
    pauseVideo: () => void;
    playVideo: () => void;
  };
}

export default function Clip() {
  const { clip, getClip, toggledCharacters, resetToggles, blockCharacterSelection } = useGameStore();
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const playerRef = useRef<YouTubePlayer & YouTubePlayerType | null>(null);
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1 as 0 | 1,
      controls: 1 as 0 | 1,
    },
  };

  const handlePlayPause = () => {
    if (playerRef.current?.internalPlayer) {
      if (playing) {
        blockCharacterSelection(true);
        const player = playerRef.current.internalPlayer as { pauseVideo: () => void };
        player.pauseVideo();
      } else {
        blockCharacterSelection(false);
        const player = playerRef.current.internalPlayer as { playVideo: () => void };
        player.playVideo();
      }

      setPlaying(!playing);
    }
  };

  const handleStart = () => {
    setStarted(true);
    blockCharacterSelection(false);
  };

  const handleReveal = () => {
    const score = calculateScore(clip.fighters, toggledCharacters);

    blockCharacterSelection(true);
    setPlaying(false);
    setScore(score);
    setRevealed(true);
  }

  const handlePlayAgain = () => {
    resetToggles();
    blockCharacterSelection(true);
    setStarted(false);
    setPlaying(true);
    setRevealed(false);
    void getClip(clip.id);
  }

  const handleEnd = () => {
    setPlaying(false);
  }

  useEffect(() => {
    void getClip(0);
  }, [getClip]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center text-center mb-10">
        <h1 className="text-3xl text-gray-800 font-semibold">
          {!started ? (
            <TextSpecial
              term1={'Just Push'}
              term2={'Play'}
            />
          ) : revealed ? (
            <>
              You got
              {' '}
              <TextSpecial
                term1={score.toLocaleString() + ' out'}
                term2={' of ' + clip.fighters.length.toLocaleString()}
              />
              {' '}
              characters!
            </>
          ) : (
            <>
              You selected
              {' '}
              <TextSpecial
                term1={toggledCharacters.length.toLocaleString() + ' out'}
                term2={' of ' + clip.fighters.length.toLocaleString()}
              />
              {' '}
              characters
            </>
          )}
        </h1>
      </div>
      <div className="flex mb-16">
        {!revealed && (
          <div>
            <Image
              src={process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_PATH + '/v1709157561/Uncategorized/mario_block.gif'}
              alt="Mario block"
              className="object-contain h-[390px] w-[480px]"
              width="0"
              height="0"
              sizes="200vw"
            />
          </div>
        )}
        {started && (
          <div
            className={!revealed ? 'hidden' : ''}
          >
            <YouTube
              videoId={clip.youtube_id}
              opts={opts}
              ref={playerRef as (LegacyRef<YouTube> | undefined)}
              onReady={(event) => {
                void event.target.playVideo();
              }}
              onEnd={handleEnd}
            />
          </div>
        )}
      </div>
      <div className="container mx-auto flex flex-col sm:flex-row gap-8 justify-center items-center mb-10">
        <BaseButton
          color={(!started || revealed) ? 'bg-gael-green' : 'bg-gael-red'}
          hoverColor={(!started || revealed) ? 'hover:bg-gael-green-dark' : 'hover:bg-gael-red-dark'}
          textColor={'text-white'}
          onClick={!started ? handleStart : (revealed ? handlePlayAgain : handleReveal)}
          text={!started ? 'Play' : (revealed ? 'New Game' : 'Reveal')}
          extraClasses={!started ? 'shadow-animate' : ''}
        />
        <BaseButton
          color={'bg-gael-blue'}
          hoverColor={'hover:bg-gael-blue-dark'}
          textColor={'text-white'}
          onClick={handlePlayPause}
          text={playing ? 'Pause' : 'Resume'}
          disabled={!started || revealed}
        />
      </div>
      {revealed ?
        <>
          <div className="container mx-auto flex flex-col sm:flex-row gap-1 justify-center items-center mb-5 mt-5">
            <div>
              <h1 className="text-2xl text-gray-800">Answers</h1>
            </div>
          </div>
          <div className="grid-1 gap-4 flex flex-col sm:flex-row justify-center mb-5">
            {clip.fighters.map((fighter) => (
              <CharacterBadge
                key={fighter + '-answer'}
                smashId={fighter}
                answer={true}
              />
            ))}
          </div>
          <div className="container mx-auto flex flex-col sm:flex-row gap-1 justify-center items-center mb-5 mt-5">
            <div>
              <h1 className="text-2xl text-gray-800">Selection</h1>
            </div>
          </div>
          <div className="grid-1 gap-4 flex flex-col sm:flex-row justify-center mb-5">
            {toggledCharacters.length === 0 ?
              <span className="bg-pink-100 text-pink-800 border-pink-400 text-xs font-medium me-2 px-2.5 py-0.5 rounded border">{revealed ? 'N/A' : "Yes it's an Aerosmith reference..."}</span>
            : (
                toggledCharacters.map((character) => (
                  <CharacterBadge
                    key={character + '-selection'}
                    smashId={character}
                    answer={false}
                  />
                ))
              )
            }
          </div>
        </>
        : <div className="mb-64"></div>
      }
    </div>
  );
};

