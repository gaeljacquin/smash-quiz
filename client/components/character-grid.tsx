'use client'

import { type ReactElement, useEffect } from 'react'

import CharacterItem from '@/components/character-item'
import useGameStore from '@/stores/game-store'

export default function CharacterGrid(): ReactElement {
  const { roster, fetchRoster } = useGameStore();

  useEffect(() => {
    void fetchRoster();
  }, [fetchRoster]);

  return (
    <>
      {roster.map((character) => (
        <CharacterItem
          key={character.smash_id}
          smashId={character.smash_id}
        />
      ))}
    </>
  )
}
