import Image from 'next/image'
// import { Video } from '@/components/video'
import type { ReactElement } from 'react'

import BaseModal from '@/components/modals/base'

export default function SixtyNineModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }): ReactElement {
  return (
    <>
      <BaseModal onClose={onClose} isOpen={isOpen}>
        {/* <Video
          src={process.env.NEXT_PUBLIC_VIDEO_PATH + '/v1709313223/Smash%20Who/Easter_Egg_69_bseNaQknOe8_bickeq.webm'}
          format={'webm'}
        /> */}
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_PATH + '/v1710284797/Uncategorized/nice.gif'}
          alt={'Nice GIF'}
          className="object-contain h-96 w-96"
          width="0"
          height="0"
          sizes="200vw"
        />
      </BaseModal>
    </>
  )
}
