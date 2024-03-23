'use client'

import type { ReactElement } from 'react';

import useGameStore from '@/stores/game-store'
import BaseButton from '~/components/buttons/base';

export default function GlowButton(): ReactElement {
  const { glow, toggleGlow, toggledCharacters, characterSelectionBlocked } = useGameStore()

  return (
    <BaseButton
      color={'bg-teal-400'}
      hoverColor={'hover:bg-teal-500'}
      textColor={'text-white'}
      onClick={() => toggleGlow()}
      disabled={toggledCharacters.length === 0 || characterSelectionBlocked}
      text={glow ? 'Remove Glow' : 'Glow Selected'}
    />
  );
};
