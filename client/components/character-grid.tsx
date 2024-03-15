'use client'

import { type ReactElement, useEffect } from 'react'

import CharacterItem from '@/components/character-item'
import useRosterStore from '@/stores/gameStore'

export default function CharacterGrid(): ReactElement {
  const { roster, fetchRoster } = useRosterStore();

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
