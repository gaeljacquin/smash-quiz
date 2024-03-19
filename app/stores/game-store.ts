import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { CharacterPlus } from '~/interfaces/character';
import type { Roster } from '~/interfaces/roster';
import { blankClip, type Clip } from '~/interfaces/clip';
import selectClip from '@/functions/select-clip';

interface GameStore {
  fetchRoster: () => Promise<void>
  glow: boolean
  resetToggles: () => void
  roster: Roster
  toggleCharacter: (smashId: string) => void
  toggledCharacters: Array<string>
  toggleGlow: () => void
  fetchClips: () => Promise<void>
  clipRandomizer: (newSession: boolean) => void
  clips: Clip[]
  currentClip: Clip
  characterSelectionBlocked: boolean
  blockCharacterSelection: (value: boolean) => void
}

export const defaultGameState = {
  fetchRoster: null,
  glow: false,
  resetToggles: null,
  roster: [],
  toggleCharacter: null,
  toggledCharacters: [],
  toggleGlow: null,
  fetchClips: null,
  clipRandomizer: null,
  clips: [],
  currentClip: blankClip,
  characterSelectionBlocked: true,
  blockCharacterSelection: null,
}

const useGameStore = create<GameStore>()(
  persist(
    devtools(
      (set, get) => ({
        ...defaultGameState,
        fetchRoster: async () => {
          try {
            const res = await fetch('/api/roster')
            const roster = await res.json() as CharacterPlus[]

            set({ roster })
          } catch (error) {
            console.error('Error fetching roster: ', error)
          }
        },
        resetToggles: () => {
          set((state) => ({
            roster: state.roster.map((character) => ({
              ...character,
              toggled: false,
            })),
            glow: false,
          }))

          set({ toggledCharacters: [] })
        },
        toggleGlow: () => set((state) => ({ glow: !state.glow })),
        toggleCharacter: (smashId) => {
          set((state) => {
            if (state.toggledCharacters.includes(smashId)) {
              const updatedToggledCharacters = state.toggledCharacters.filter(
                (id) => id !== smashId
              )

              return { toggledCharacters: updatedToggledCharacters }
            } else {
              return { toggledCharacters: [...state.toggledCharacters, smashId] }
            }
          });
        },
        fetchClips: async () => {
          try {
            const res = await fetch('/api/clips');
            const clips = await res.json() as Clip[];

            set({ clips });
          } catch (error) {
            console.error('Error fetching clips or setting clip: ', error)
          }
        },
        clipRandomizer: (newSession: boolean) => {
          const { clips, currentClip: selectedClip } = get();
          const clip = selectClip(clips, selectedClip.id, newSession);

          set({ currentClip: clip });
        },
        blockCharacterSelection: (value: boolean) => {
          set({ characterSelectionBlocked: value });
        },
      }),
    ), {
      name: 'GameStore',
      partialize: (state) => {
        const { glow, characterSelectionBlocked, ...rest } = state;
        void glow;
        void characterSelectionBlocked;

        return rest;
      },
    }
  )
)

export default useGameStore
