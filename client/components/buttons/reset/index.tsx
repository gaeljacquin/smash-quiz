'use client'

import type { ReactElement } from 'react';

import useRosterStore from '@/stores/gameStore';
import BaseButton from '~/components/buttons/base';

export default function ResetButton(): ReactElement {
  const { resetToggles, toggledCharacters, characterSelectionBlocked } = useRosterStore()

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
