import { type ReactElement, useState, useEffect, useCallback, useRef, useMemo } from 'react';

import SixtyNineModal from '@/components/modals/sixtynine';
import KonamiModal from '@/components/modals/konami';
import IdclipModal from '@/components/modals/idclip';

type EasterEggsProps = {
  count?: number,
}

export default function EasterEggs({ count }: EasterEggsProps): ReactElement {
  const [sixtyNineModalOpen, setSixtyNineModalOpen] = useState(false);
  const [open69, hide69] = useState(false);
  const [konamiModalOpen, setKonamiModalOpen] = useState(false);
  const [idclipModalOpen, setIdclipModalOpen] = useState(false);
  const konamiCode = useMemo(() => ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], []);
  const idclip = useMemo(() => ['i', 'd', 'c', 'l', 'i', 'p'], []);
  const konamiCodeIndex = useRef(0);
  const idclipIndex = useRef(0);

  const checkKonamiCode = useCallback((key: string) => {
    if (!idclipModalOpen && !sixtyNineModalOpen) {
      if (key === konamiCode[konamiCodeIndex.current]) {
        konamiCodeIndex.current++;

        if (konamiCodeIndex.current === konamiCode.length) {
          setKonamiModalOpen(true);
          konamiCodeIndex.current = 0;
        }
      } else {
        konamiCodeIndex.current = 0;
      }
    }
  }, [konamiCode, idclipModalOpen, sixtyNineModalOpen]);

  const checkIdclip = useCallback((key: string) => {
    if (!konamiModalOpen && !sixtyNineModalOpen) {
      if (key === idclip[idclipIndex.current]) {
        idclipIndex.current++;

        if (idclipIndex.current === idclip.length) {
          setIdclipModalOpen(true);
          idclipIndex.current = 0;
        }
      } else {
        idclipIndex.current = 0;
      }
    }
  }, [idclip, konamiModalOpen, sixtyNineModalOpen]);

  useEffect(() => {
    if (count === 69 && !open69) {
      setSixtyNineModalOpen(true);
      hide69(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      checkKonamiCode(e.key);
      checkIdclip(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [checkKonamiCode, checkIdclip, count, open69]);

  return (
    <>
      <SixtyNineModal
        onClose={() => setSixtyNineModalOpen(false)}
        isOpen={sixtyNineModalOpen}
      />
      <KonamiModal
        onClose={() => setKonamiModalOpen(false)}
        isOpen={konamiModalOpen}
      />
      <IdclipModal
        onClose={() => setIdclipModalOpen(false)}
        isOpen={idclipModalOpen}
      />
    </>
  );
}
