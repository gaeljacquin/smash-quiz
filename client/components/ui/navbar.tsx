'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import LottieDynamic from '@/components/lottie-dynamic';

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');

      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLink = (path: string, text: string) => {
    const markup = (
      <Link
        href={`${path}`}
        className={`${path === pathname ? 'text-gael-green-light md:text-gael-green' : 'md:hover:text-gael-blue'}`}
        onClick={path === pathname ? (e) => e.preventDefault() : () => null}
      >
        {text}
      </Link>
    )

    return markup;
  }

  return (
    <>
      <header>
        <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-200 backdrop-filter backdrop-blur-md dark:border-gray-600">
          <ul className="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-5">
            <div className="w-36 h-auto">
              <Link href="https://gaeljacquin.com">
                <LottieDynamic />
              </Link>
            </div>

            <input type="checkbox" id="check" />

            <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
              <li>{navLink("/", "Home")}</li>

              <label htmlFor="check" className="close-menu">
                X
              </label>
            </span>

            <label htmlFor="check" className="open-menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </label>
          </ul>
        </nav>
      </header>
    </>
  );
};
