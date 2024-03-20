'use client'

import Image from 'next/image';

import type { CharacterItemProps } from '@/interfaces/character';
import useGameStore from '@/stores/game-store';

export default function CharacterItem(props: CharacterItemProps) {
  const { currentClip: clip, roster, toggleCharacter, toggledCharacters, glow, characterSelectionBlocked } = useGameStore();
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
        <>
          <div className="avatar tooltip hidden lg:inline-block" data-tip={character.name_en_us}>
            <div
              className={
                `border-2 border-black rounded-xl bg-indigo-100 ${brightness} ${glow && toggled && toggledCharacters.length !== 0 ? 'shadow-animate' : ''}`
              }
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
          <div className="inline-block lg:hidden" data-tip={character.name_en_us}>
            <span
              className="bg-sky-100 text-sky-800 border-sky-400 text-xs font-semibold me-2 px-2.5 py-0.5 rounded border border-2"
            >
              {character.name_en_us}
            </span>
          </div>
        </>
      }
    </>
  )
}
