'use client'

import type { ReactElement } from 'react';

import useRosterStore from '@/stores/gameStore'
import BaseButton from '~/components/buttons/base';

export default function GlowButton(): ReactElement {
  const { glow, toggleGlow, toggledCharacters, characterSelectionBlocked } = useRosterStore()

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
