'use client'

import Link from 'next/link'
import { type ReactElement, useState } from 'react'

import useRosterStore from '~/stores/useRosterStore'
import EasterEggs from '@/components/easter-eggs'

export default function HomepageButtons(): ReactElement {
  const [count, setCount] = useState(0);
  const [glowingCounter, setGlowingCounter] = useState(false);

  const increment = () => {
    setCount(count + 1);
  }

  const glowCounter = () => {
    setGlowingCounter(true);
    setTimeout(() => { setGlowingCounter(false) }, 2000);
  }

  return (
    <>
      <div data-aos="zoom-y-out" data-aos-delay="300">
        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div>
            <Link className="btn text-white bg-gael-green-dark hover:bg-gael-green w-full mb-4 sm:w-auto sm:mb-0" href="/game">
              <span>Launch Game</span>
            </Link>
          </div>
          <div>
            <button
              className={`btn text-white bg-gael-purple-dark hover:bg-gael-purple w-full sm:w-auto sm:ml-4${glowingCounter ? ' shadow-animate-2' : ''}`}
              onClick={() => {increment(); glowCounter()}}
            >
              Counter: {count}
            </button>
          </div>
        </div>
      </div>

      <EasterEggs count={count} />
    </>
  )
}
