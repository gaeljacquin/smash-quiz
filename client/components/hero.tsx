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
            thumb={process.env.uncategorizedPath + 'mural.webp'}
            thumbWidth={1681}
            thumbHeight={1681}
            thumbAlt="Video thumbnail"
            video={process.env.uncategorizedPath + 'Smash%20Quiz%20Demo.mp4'}
            videoTitle={'How to Play'}
            videoWidth={1920}
            videoHeight={1080}
            // youtubeId={'A8nitPWsGNY'}
          />
        </div>
      </div>
    </section>
  )
}
