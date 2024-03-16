'use client';

import Image from 'next/image';
import { type LegacyRef, useEffect, useRef, useState } from 'react';
import YouTube, { type YouTubePlayer } from 'react-youtube';
import Timer from 'react-compound-timerv3';

import useGameStore from '@/stores/game-store';
import BaseButton from '@/components/buttons/base';
import TextSpecial from '@/components/text-special';
import calculateScore from '@/utils/functions/calculate-score';
import CharacterBadge from '@/components/character-badge';
import { random } from '@/utils/constants';

type YouTubePlayerType = {
  internalPlayer: {
    pauseVideo: () => void;
    playVideo: () => void;
  };
}

type TimerType = {
  resume: () => void
  pause: () => void
  stop: () => void
}

export default function Clip() {
  const { currentClip: clip, fetchClips, toggledCharacters, resetToggles, blockCharacterSelection } = useGameStore();
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const playerRef = useRef<YouTubePlayer & YouTubePlayerType | null>(null);
  const secretMessage = 'ok no more oriohn jam';
  const [timerText, setTimerText] = useState(secretMessage)

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
    setTimerText('seconds left');
  };

  const handleReveal = () => {
    blockCharacterSelection(true);
    setPlaying(false);
    setRevealed(true);
  }

  const handlePlayAgain = () => {
    resetToggles();
    blockCharacterSelection(true);
    setStarted(false);
    setPlaying(true);
    setRevealed(false);
    setTimerText(secretMessage);
    void fetchClips();
  }

  useEffect(() => {
    void fetchClips();
  }, [fetchClips]);

  return (
    <div className="flex flex-col items-center">
      {started ? (
        <>
          <Timer
            initialTime={clip.timer * 1000}
            direction="backward"
            onResume={handlePlayPause}
            onPause={handlePlayPause}
            onStop={() => {
              handleReveal();
            }}
            checkpoints={[
              {
                time: 1000,
                callback: () => setTimerText('second left'),
              },
              {
                time: 0,
                callback: () => {
                  setTimerText('seconds left');
                  handleReveal();
                },
              },
            ]}
          >
            {({ resume, pause, stop }: TimerType) => (
              <>
                <div className="flex justify-center items-center text-center mb-10">
                  <h1 className="text-3xl text-gray-800 font-semibold">
                    {revealed ?
                      <>
                        You got
                        {' '}
                        <TextSpecial
                          term1={calculateScore(clip.fighters, toggledCharacters).toLocaleString() + ' out'}
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
                    }
                  </h1>
                </div>
                <div className="flex justify-center items-center text-center mb-10">
                  <h2 className="text-2xl text-gray-800 font-semibold">
                    <Timer.Seconds />
                    {' '}
                    {timerText}
                  </h2>
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
                  <div
                    className={!revealed ? 'hidden' : ''}
                  >
                    <YouTube
                      videoId={clip.youtube_id}
                      opts={random.gameOpts}
                      ref={playerRef as (LegacyRef<YouTube> | undefined)}
                      onReady={(event) => {
                        void event.target.playVideo();
                      }}
                    />
                  </div>
                </div>
                <div className="container mx-auto flex flex-col sm:flex-row gap-8 justify-center items-center mb-10">
                  <BaseButton
                    color={revealed ? 'bg-gael-green' : 'bg-gael-red'}
                    hoverColor={revealed ? 'hover:bg-gael-green-dark' : 'hover:bg-gael-red-dark'}
                    textColor={'text-white'}
                    onClick={revealed ? handlePlayAgain : stop}
                    text={revealed ? 'New Game' : 'Reveal'}
                  />
                  <BaseButton
                    color={'bg-gael-blue'}
                    hoverColor={'hover:bg-gael-blue-dark'}
                    textColor={'text-white'}
                    onClick={playing ? pause : resume}
                    text={playing ? 'Pause' : 'Resume'}
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
                  <div className="mb-64"></div>
                }
              </>
            )}
          </Timer>
        </>
      ):
        <>
          <div className="flex justify-center items-center text-center mb-10 -mt-12">
            <h1 className="text-3xl text-gray-800 font-semibold">
              <TextSpecial
                term1={'Just Push'}
                term2={'Play'}
              />
            </h1>
          </div>
          <div className="flex justify-center items-center text-center mb-10">
            <h2 className="text-2xl text-transparent font-semibold">
              {timerText}
            </h2>
          </div>
          <div className="flex mb-16">
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
          </div>
          <div className="container mx-auto flex flex-col sm:flex-row gap-8 justify-center items-center mb-10">
            <BaseButton
              color={'bg-gael-green'}
              hoverColor={'hover:bg-gael-green-dark'}
              textColor={'text-white'}
              onClick={handleStart}
              text={'Play'}
              extraClasses={'shadow-animate'}
            />
            <BaseButton
              color={'bg-gael-blue'}
              hoverColor={'hover:bg-gael-blue-dark'}
              textColor={'text-white'}
              onClick={() => null}
              text={'Pause'}
              disabled={true}
            />
          </div>
          <div className="mb-52 -mt-2"></div>
        </>
      }
    </div>
  );
};

