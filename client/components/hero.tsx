'use client'

import ModalVideo from '@/components/modal-video'
import HomepageButtons from '@/components/buttons/homepage'

export default function Hero() {
  return (
    <section className="relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pb-12 pt-7 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <div className="max-w-3xl mx-auto">
              <HomepageButtons />
            </div>
          </div>

          <ModalVideo
            thumb={process.env.NEXT_PUBLIC_IMAGE_PATH + ',c_limit/v1710283363/Uncategorized/mural.webp'}
            thumbWidth={1681}
            thumbHeight={1681}
            thumbAlt="Video thumbnail"
            video={process.env.NEXT_PUBLIC_VIDEO_PATH + '/v1709148851/Uncategorized/ewvfko5dr83rj8es86ej.webm'}
            videoTitle={'Just Push Play'}
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  )
}
