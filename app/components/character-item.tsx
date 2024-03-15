'use client'

import Image from 'next/image';

import type { CharacterItemProps } from '@/interfaces/character';
import useRosterStore from '@/stores/gameStore';

export default function CharacterItem(props: CharacterItemProps) {
  const { clip, roster, toggleCharacter, toggledCharacters, glow, characterSelectionBlocked } = useRosterStore();
  const character = roster.find((character) => character.smash_id === props.smashId);
  const toggled = character ? toggledCharacters.includes(character.smash_id) : false;
  let brightness = '';

  if (!toggled) {
    if (toggledCharacters.length === clip.fighters.length) {
      brightness = 'grayscale';
    } else {
      brightness = 'brightness-50';
    }
  }

  const onClick = (smash_id: string) => {
    if ((toggledCharacters.length === clip.fighters.length && !toggled) || characterSelectionBlocked) {
      () => null;
    } else {
      toggleCharacter(smash_id);
    }
  }

  return (
    <>
      {character &&
        <div className="avatar">
          <div
            className={`border-2 border-black rounded-xl bg-indigo-100 ${brightness} ${glow && toggled && toggledCharacters.length !== 0 ? 'shadow-animate' : ''}`}
            onClick={() => onClick(character.smash_id)}
          >
            <Image
              src={character.partial_img}
              alt={character.name_en_us}
              className="mx-auto object-cover w-auto h-auto"
              width="0"
              height="0"
              sizes="200vw"
              priority
            />
          </div>
        </div>
      }
    </>
  )
}
