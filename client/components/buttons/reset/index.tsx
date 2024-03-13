'use client'

import type { ReactElement } from 'react'

import useRosterStore from '~/stores/useRosterStore'

export default function ResetButton(): ReactElement {
  const { resetToggles, toggledCharacters } = useRosterStore()

  return (
    <button
      onClick={() => resetToggles()}
      className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-gael-purple hover:bg-gael-purple-dark glass text-white'
      disabled={toggledCharacters.length === 0}
    >
      Reset
    </button>
  )
}
