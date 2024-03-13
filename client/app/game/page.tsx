import type { ReactElement } from 'react'

import CharacterGrid from '@/components/character-grid'
import ResetButton from '@/components/buttons/reset'

export default async function Game(): Promise<ReactElement> {
  return (
    <>
      <section className="relative mb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-20 pb-12 md:pt-28 md:pb-20">
            <div className="text-center p-10 -mt-24 mb-16">
              <div className="items-center space-x-4">
                <ResetButton />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-screen-xl">
          <CharacterGrid />
        </div>
      </section>
    </>
  )
}
