'use client';

import dynamic from 'next/dynamic';
import type { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';

import animationData from '@/assets/Animated Logo.json';

export default function LottieDynamic() {
  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
  const logoRef = useRef<LottieRefCurrentProps>(null);

  return (
    <Lottie lottieRef={logoRef} animationData={animationData} loop={false} />
  )
}
