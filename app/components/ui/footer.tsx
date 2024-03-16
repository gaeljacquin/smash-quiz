import Image from 'next/image';
import Link from 'next/link';

import { nowGael } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 max-w-6xl mx-auto border-t border-gray-200">
      <aside>
        <Image
          src={process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_PATH + '/v1709227789/main/logo.webp'}
          alt="Gaël's Logo"
          className="mx-auto w-16 h-auto"
          sizes="100vw"
          width="0"
          height="0"
        />
        <p className="font-bold">
          Smashing it 🙃
        </p>
        <p>
          &copy; {nowGael.currentYear}
          {' '}
          <Link href="https://gaeljacquin.com">
            <span className="text-gael-green">Gaël Jacquin</span>
          </Link>.
          {' '}
          All rights reserved.
        </p>

        <nav className="mt-2">
          <div className="grid grid-flow-col gap-7">
            <Link href="https://github.com/gaeljacquin" target="_blank" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full border border-gray-200 hover:border-gray-400 shadow transition duration-150 ease-in-out" aria-label="Github">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-12 h-12 fill-current">
                <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
              </svg>
            </Link>
            <Link href="https://linkedin.com/in/gaeljacquin" target="_blank" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full border border-gray-200 hover:border-gray-400 shadow transition duration-150 ease-in-out" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-12 h-12 fill-current">
                <rect x="7" y="7" width="18" height="18" fill="gray-600"/>
                <text x="16" y="16" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle">in</text>
              </svg>
            </Link>
          </div>
        </nav>
      </aside>
    </footer>
  )
}
