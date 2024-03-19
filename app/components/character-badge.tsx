'use client'

import type { CharacterItemProps } from '@/interfaces/character';
import useGameStore from '@/stores/game-store'

export default function CharacterBadge(props: CharacterItemProps) {
  const { currentClip: clip, roster } = useGameStore();
  const character = roster.find((character) => character.smash_id === props.smashId);
  const correct = character ? clip.fighters.includes(character.smash_id) : false;
  let classes = '';

  if (correct) {
    if (props.answer) {
      classes = 'bg-indigo-100 text-indigo-800 border-indigo-400'
    } else {
      classes = 'bg-green-100 text-green-800 border-green-400'
    }
  } else {
    classes = 'bg-red-100 text-red-800 border-red-400';
  }

  return (
    <>
      {character &&
        <span
          className={`${classes} text-xs font-semibold me-2 px-3.5 py-1.5 rounded border border-2`}
        >
          {character.name_en_us}
        </span>
      }
    </>
  )
}
