'use client'

import { type ReactElement, useEffect, useState } from 'react'

import CharacterItem from '@/components/character-item'
import useRosterStore from '~/stores/useRosterStore'

export default function CharacterGrid(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number | null>(null)
  const { roster, fetchRoster } = useRosterStore()

  const handleCharacterRightClick = (characterIndex: number) => {
    setSelectedCharacterIndex(characterIndex)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedCharacterIndex(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    void fetchRoster();
  }, [fetchRoster]);

  return (
    <>
      <div className="flex justify-center -mt-32">
        <div className="grid grid-cols-12 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-12 gap-2">
          {roster.map((character, index) => (
            <CharacterItem
              key={character.smash_id}
              smashId={character.smash_id}
              openCharacterModal={() => handleCharacterRightClick(index)}
            />
          ))}

        </div>
      </div>
    </>
  )
}
