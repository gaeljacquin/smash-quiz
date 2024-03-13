'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { FC, ReactElement } from 'react'

import useRosterStore from '~/stores/useRosterStore'

interface CharacterItemProps {
  smashId: string
  openCharacterModal: () => void
}

const CharacterItem: FC<CharacterItemProps> = (characterItemProps): ReactElement => {
  const {...props} = characterItemProps
  const { roster, toggleCharacter, toggledCharacters, glow } = useRosterStore()
  const character = roster.find((character) => character.smash_id === props.smashId)
  const toggled = character ? toggledCharacters.includes(character.smash_id) : false

  return (
    <>
      {character &&
        <div className="avatar">
          <div
            className={`flex border-2 border-black rounded-xl bg-indigo-100${toggled ? ' grayscale' : ''}${glow && !toggled && toggledCharacters.length !== 0 ? ' shadow-animate' : ''}`}
            onClick={() => toggleCharacter(character.smash_id)}
          >
            <Image
              src={character.partialImg}
              alt={character.name.en_us}
              className="mx-auto w-auto h-auto"
              width="0"
              height="0"
              sizes="200vw"
              priority
            />
          </div>
          <Link href='#'>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-black bg-opacity-50 text-white text-center rounded-b-xl flex justify-center items-center" onClick={() => props.openCharacterModal()}>
              <p className="text-xs xs:text-base">{character.name.en_us}</p>
            </div>
          </Link>
        </div>
      }
    </>
  )
}

export default CharacterItem
