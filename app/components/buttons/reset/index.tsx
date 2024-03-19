'use client'

import type { ReactElement } from 'react';

import useGameStore from '@/stores/game-store';
import BaseButton from '~/components/buttons/base';

export default function ResetButton(): ReactElement {
  const { resetToggles, toggledCharacters, characterSelectionBlocked } = useGameStore()

  return (
    <BaseButton
      color={'bg-purple-400'}
      hoverColor={'hover:bg-purple-500'}
      textColor={'text-white'}
      onClick={() => resetToggles()}
      disabled={toggledCharacters.length === 0 || characterSelectionBlocked}
      text={'Reset'}
    />
  )
}
