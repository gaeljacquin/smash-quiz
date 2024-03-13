import Image from 'next/image'
import type { ReactElement } from 'react'

import BaseModal from '@/components/modals/base'

export default function KonamiModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }): ReactElement {
  return (
    <>
      <BaseModal onClose={onClose} isOpen={isOpen}>
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_PATH + '/v1709168038/Uncategorized/captain-falcon-gangam-style.gif'}
          alt={'Captain Falcon Gangam Style GIF'}
          className="object-contain h-96 w-96"
          width="0"
          height="0"
          sizes="200vw"
        />
      </BaseModal>
    </>
  )
}
