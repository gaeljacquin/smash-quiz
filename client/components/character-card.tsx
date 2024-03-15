'use client'

import Image from 'next/image'
import type { ReactElement } from 'react'

import type { CharacterPlus } from '~/interfaces/character'

const CharacterCard = (character: CharacterPlus): ReactElement => {
  return (
    <>
      <div className={`border-2 border-black rounded-xl shadow ${character?.toggled ? 'grayscale' : ''}`}>
        <figure className="bg-gael-green rounded-xl">
          <Image
            src={character.full_img}
            alt={character.name_en_us}
            className="object-contain h-80 w-80"
            width="0"
            height="0"
          />
          <div className="bottom-0 left-0 w-full h-16 bg-gael-green text-white text-center flex items-center justify-center bg-opacity-50">
            <p className="text-sm md:text-lg">{character.name_en_us}</p>
          </div>
        </figure>
      </div>
    </>
  )
}

export default CharacterCard
