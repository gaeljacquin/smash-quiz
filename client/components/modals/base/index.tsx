'use client'

import type { ReactElement, ReactNode } from 'react'

export interface BaseModalProps {
  children?: ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function BaseModal(baseModalProps: BaseModalProps): ReactElement {
  return (
    <>
      {baseModalProps.isOpen && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={baseModalProps.onClose}
          >
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
                data-te-modal-init
                aria-label="Close"
                onClick={baseModalProps.onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className='w-auto' onClick={e => {e.stopPropagation()}}>
                {baseModalProps.children}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}
