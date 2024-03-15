import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { CharacterPlus } from '~/interfaces/character';
import type { Roster } from '~/interfaces/roster';
import { blankClip, type Clip } from '~/interfaces/clip';

interface GameStore {
  fetchRoster: () => Promise<void>
  glow: boolean
  resetToggles: () => void
  roster: Roster
  toggleCharacter: (smashId: string) => void
  toggledCharacters: Array<string>
  toggleGlow: () => void
  getClip: (lastClipId: number) => Promise<void>
  clip: Clip
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
  getClip: null,
  clip: blankClip,
  characterSelectionBlocked: true,
  blockCharacterSelection: null,
}

const useGameStore = create<GameStore>()(
  persist(
    devtools(
      (set) => ({
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
        getClip: async (lastClipId = 0) => {
          try {
            const res = await fetch('/api/clip', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ exclude: lastClipId })
            });

            if (!res.ok) {
              throw new Error('Failed to fetch clip data');
            }

            const clip = await res.json() as Clip;

            set({ clip });
          } catch (error) {
            console.error('Error fetching clip data: ', error);
          }
        },
        blockCharacterSelection: (value: boolean) => {
          set({ characterSelectionBlocked: value });
        },
      }),
    ), {
      name: 'GameStore',
      partialize: (state) => {
        const { glow, toggledCharacters, characterSelectionBlocked, ...rest } = state;
        void glow;
        void toggledCharacters;
        void characterSelectionBlocked;

        return rest;
      },
    }
  )
)

export default useGameStore
