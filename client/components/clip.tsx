'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';

import useGameStore from '@/stores/game-store';
import BaseButton from '@/components/buttons/base';
import TextSpecial from '@/components/text-special';
import calculateScore from '@/functions/calculate-score';
import CharacterBadge from '@/components/character-badge';
import { messages } from '@/constants';
import { type Clip } from '@/interfaces/clip';
import { Video } from '@/components/video';
import { Audio } from '@/components/audio';

export default function Clip() {
  const { toggledCharacters, resetToggles, blockCharacterSelection, clipRandomizer, currentClip: clip } = useGameStore();
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const logPlay = useCallback(() => {
    const score =  calculateScore(clip.fighters, toggledCharacters);
    const now = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
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
    if (audioRef.current) {
      if (!started) {
        handleStart();
        void audioRef.current.play();
      } else {
        if (playing) {
          blockCharacterSelection(true);
          audioRef.current.pause();
        } else {
          blockCharacterSelection(false);
          void audioRef.current.play();
        }
      }

      setPlaying(!playing);
    }
  };

  const handleStart = () => {
    setStarted(true);
    blockCharacterSelection(false);
  };

  const handleReveal = useCallback(() => {
    setRevealed(true);
    const score = calculateScore(clip.fighters, toggledCharacters);
    setScore(score);
    blockCharacterSelection(true);
    logPlay();
  }, [blockCharacterSelection, clip.fighters, toggledCharacters, logPlay]);

  const handleNewGame = () => {
    resetToggles();
    blockCharacterSelection(true);
    setStarted(false);
    setRevealed(false);
    clipRandomizer(false);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <>
          <div className="flex justify-center items-center text-center mb-10 mt-8">
            <h1 className="text-3xl text-gray-800 font-semibold">
              {!started && !revealed ?
                <>
                  <TextSpecial
                    term1={'🟢🟢🟢'}
                    term2={'🟢🟢🟢'}
                    space={false}
                  />
                </>
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
          {!revealed ? (
            <>
              <div className="flex mt-7 mb-12">
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
              <div className="flex mb-16">
                <Audio
                  src={process.env.gameClipPath + clip.clip_name + '.mp4'}
                  audioRef={audioRef}
                  handlePlayPause={handlePlayPause}
                />
              </div>
            </>
          ): (
            <>
              <div className="flex mb-12">
                <Video
                  src={process.env.gameClipPath + clip.clip_name + '.mp4'}
                />
              </div>
            </>
          )}
          <div className="container mx-auto flex flex-col sm:flex-row gap-8 justify-center items-center mb-10">
            <BaseButton
              color={revealed ? 'bg-gael-green' : 'bg-gael-blue'}
              hoverColor={revealed ? 'hover:bg-gael-green-dark' : 'hover:bg-gael-blue-dark'}
              textColor={'text-white'}
              onClick={revealed ? handleNewGame : handleReveal}
              text={revealed ? 'New Game' : 'Reveal'}
              extraClasses={revealed ? 'shadow-animate' : ''}
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
                <h1 className="text-2xl text-gray-800">Selection</h1>
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
    </>
  );
};

