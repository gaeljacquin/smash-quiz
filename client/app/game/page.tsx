'use client'

import { useEffect, type ReactElement } from 'react';

import CharacterGrid from '@/components/character-grid';
import ResetButton from '@/components/buttons/reset';
import GlowButton from '@/components/buttons/glow';
import Clip from '@/components/clip';
import useGameStore from '@/stores/game-store';

export default function Game(): ReactElement {
  const { fetchClips, clipRandomizer, resetToggles } = useGameStore();
  const bg = process.env.NODE_ENV === 'production' ? 'bg-transparent' : 'bg-gray-200';

  useEffect(() => {
    resetToggles();
    void fetchClips().then(() => clipRandomizer(true));
  }, [fetchClips, clipRandomizer, resetToggles]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto mb-20 mt-10">
        <div className={`flex items-center justify-center ${bg}`}>
          <Clip />
        </div>
        <div className={`items-center justify-center ${bg}`}>
          <div className="
            flex grid p-10
            grid-cols-4 gap-6
            xs:grid-cols-4 xs:gap-6
            sm:grid-cols-4 sm:gap-4
            lg:grid-cols-4 lg:gap-4
            xl:grid-cols-6 xl:gap-8
            2xl:grid-cols-10 2xl:gap-6
          ">
            <CharacterGrid />
          </div>
          <div className="container mx-auto flex flex-col sm:flex-row gap-8 justify-center items-center mt-10">
            <ResetButton />
            <GlowButton />
          </div>
        </div>
      </div>
    </>
  );
}
