import Image from 'next/image'
import type { ReactElement } from 'react'

import BaseModal from '@/components/modals/base'

export default function idclipModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }): ReactElement {
  return (
    <>
      <BaseModal onClose={onClose} isOpen={isOpen}>
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_PATH + '/v1709320782/Uncategorized/big-brother.jpg'}
          alt={'Big Brother is watching you'}
          className="object-contain h-96 w-96"
          width="0"
          height="0"
          sizes="200vw"
        />
      </BaseModal>
    </>
  )
}
