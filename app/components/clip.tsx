'use client';

import Image from 'next/image';
import { type LegacyRef, useEffect, useRef, useState, useCallback } from 'react';
import YouTube, { type YouTubePlayer } from 'react-youtube';

import useGameStore from '@/stores/game-store';
import BaseButton from '@/components/buttons/base';
import TextSpecial from '@/components/text-special';
import calculateScore from '@/functions/calculate-score';
import CharacterBadge from '@/components/character-badge';
import { random, messages } from '@/constants';
import { type Clip } from '@/interfaces/clip';

type YouTubePlayerType = {
  internalPlayer: {
    pauseVideo: () => void;
    playVideo: () => void;
  };
}

export default function Clip() {
  const { toggledCharacters, resetToggles, blockCharacterSelection, clipRandomizer, currentClip: clip } = useGameStore();
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [score, setScore] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const playerRef = useRef<YouTubePlayer & YouTubePlayerType | null>(null);

  const logPlay = useCallback(() => {
    const score =  calculateScore(clip.fighters, toggledCharacters);
    const now = Math.floor(Date.now() / 1000); // Convert to seconds
    const data = {
      clip_id: clip.id,
      score: score,
      answers: clip.fighters.length,
      selected: toggledCharacters,
      played: now
    };

    void fetch('/api/played', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }, [clip.fighters, clip.id, toggledCharacters]);

  const handlePlayPause = () => {
    if (playerRef.current?.internalPlayer) {
      if (playing) {
        blockCharacterSelection(true);
        const player = playerRef.current.internalPlayer as { pauseVideo: () => void };
        player.pauseVideo();
        clearInterval(intervalRef.current);
      } else {
        blockCharacterSelection(false);
        const player = playerRef.current.internalPlayer as { playVideo: () => void };
        player.playVideo();
        intervalRef.current = setInterval(countdown, 1000);
      }

      setPlaying(!playing);
    }
  };

  const handleStart = () => {
    setStarted(true);
    setSecondsRemaining(clip.timer);
    blockCharacterSelection(false);
  };

  const handleReveal = useCallback(() => {
    setRevealed(true);
    const score = calculateScore(clip.fighters, toggledCharacters);
    setScore(score);
    blockCharacterSelection(true);
    setPlaying(false);
    logPlay();
  }, [blockCharacterSelection, clip.fighters, toggledCharacters, logPlay]);

  const handlePlayAgain = () => {
    resetToggles();
    blockCharacterSelection(true);
    setStarted(false);
    setPlaying(false);
    setRevealed(false);
    clipRandomizer(false);
    setSecondsRemaining(clip.timer);
  }

  const countdown = useCallback(() => {
    if (secondsRemaining > 0) {
      setSecondsRemaining((prev) => prev - 1);
    } else {
      handleReveal()
    }
  }, [secondsRemaining, handleReveal]);

  useEffect(() => {
    // console.log('clip', clip);
    if (started && !revealed) {
      intervalRef.current = setInterval(countdown, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [countdown, started, revealed]);

  return (
    <div className="flex flex-col items-center">
      <>
        <div className="flex justify-center items-center text-center mb-10 mt-10">
          <h1 className="text-3xl text-gray-800 font-semibold">
            {!started ?
              <TextSpecial
                term1={'🟢🟢🟢'}
                term2={'🟢🟢🟢'}
                space={false}
              />
            : (revealed ?
                <>
                  You got
                  {' '}
                  <TextSpecial
                    term1={score + ' out'}
                    term2={' of ' + clip.fighters.length.toLocaleString()}
                  />
                  {' '}
                  characters!
                </>
              :
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
              )
            }
          </h1>
        </div>
        <div className="flex mb-12">
          <div className={`${revealed ? 'hidden' : ''}`}>
            <Image
              src={process.env.uncategorizedPath + 'mario_block.gif'}
              alt="Mario block"
              className="object-contain h-[390px] w-[480px]"
              width="0"
              height="0"
              sizes="200vw"
              priority
              unoptimized
            />
          </div>
          {started &&
            <div className={`${!revealed ? 'hidden' : ''}`}>
              <YouTube
                videoId={clip.youtube_id}
                opts={random.gameOpts}
                ref={playerRef as (LegacyRef<YouTube> | undefined)}
                onReady={(event) => {
                  void event.target.playVideo();
                }}
              />
            </div>
          }
        </div>
        <div className="flex justify-center items-center text-center mb-12">
          <div className="flex items-center justify-center p-2 rounded-full w-16 h-16 bg-transparent border-4 border-gael-green">
            <h2 className={`text-gael-green ${!started ? 'text-small' : 'text-2xl'} font-bold leading-none`}>
              {!started ? '|' : secondsRemaining}
            </h2>
          </div>
        </div>
        <div className="container mx-auto flex flex-col sm:flex-row gap-8 justify-center items-center mb-10">
          <BaseButton
            color={!started || revealed ? 'bg-gael-green' : 'bg-gael-red'}
            hoverColor={!started || revealed ? 'hover:bg-gael-green-dark' : 'hover:bg-gael-red-dark'}
            textColor={'text-white'}
            onClick={!started ? handleStart : (revealed ? handlePlayAgain : handleReveal)}
            text={!started ? 'Play' : (revealed ? 'New Game' : 'Reveal')}
            extraClasses={`${!started ? 'shadow-animate' : ''}`}
          />
          <BaseButton
            color={'bg-gael-blue'}
            hoverColor={'hover:bg-gael-blue-dark'}
            textColor={'text-white'}
            onClick={started ? handlePlayPause : () => null}
            text={playing || revealed ? 'Pause' : 'Resume'}
            disabled={revealed}
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
        :
          <div className="mb-64">
            <h2 className="text-2xl font-semibold text-transparent">
              {messages.secret}
            </h2>
          </div>
        }
      </>
    </div>
  );
};

