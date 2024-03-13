import type { CharacterPlus } from '~/interfaces/character'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Roster } from '~/interfaces/roster'

interface RosterStore {
  fetchRoster: () => Promise<void>
  glow: boolean
  glowSignIn: boolean
  randomlySelectedCharacter: CharacterPlus | null
  resetToggles: () => void
  roster: Roster
  setRandomlySelectedCharacter: (randomlySelectedCharacter: CharacterPlus | null) => void
  toggleCharacter: (smashId: string) => void
  toggledCharacters: Array<string>
  toggleGlow: () => void
  toggleGlowSignIn: () => void
}

export const defaultRosterState = {
  fetchRoster: null,
  glow: false,
  glowSignIn: false,
  randomlySelectedCharacter: null,
  resetToggles: null,
  roster: [],
  setRandomlySelectedCharacter: null,
  toggleCharacter: null,
  toggledCharacters: [],
  toggleGlow: null,
  toggleGlowSignIn: null,
}

function prepareImgUrl (character: CharacterPlus) {
  const partialImg = process.env.imagePath + '/' + character.chara_0 + '/SSBU Roster/' + character.simple_name + '/chara_0_' + character.simple_name + '_00.png';
  const fullImg = process.env.imagePath + '/' + character.chara_5 + '/SSBU Roster/' + character.simple_name + '/chara_5_' + character.simple_name + '_00.png';

  return { partialImg, fullImg };
}

const useRosterStore = create<RosterStore>()(
  persist(
    devtools(
      (set) => ({
        ...defaultRosterState,
        fetchRoster: async () => {
          try {
            const res = await fetch(`/api/roster`)
            const roster: Roster = await res.json() as CharacterPlus[]
            const imgLink = (char: CharacterPlus) => prepareImgUrl(char)

            roster.forEach(character => (character.partialImg = imgLink(character).partialImg, character.fullImg = imgLink(character).fullImg))

            set({ roster })
          } catch (error) {
            console.error('Error fetching roster:', error)
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
        setRandomlySelectedCharacter: (character: CharacterPlus | null) => {
          set({ randomlySelectedCharacter: character })
        },
        toggleGlow: () => set((state) => ({ glow: !state.glow })),
        toggleGlowSignIn: () => set((state) => ({ glowSignIn: !state.glowSignIn })),
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
      }),
    ), {
      name: 'rosterStore',
      partialize: (state) => {
        const { glow, glowSignIn, ...rest } = state;
        void glow;
        void glowSignIn;


        return rest;
      },
    }
  )
)

export default useRosterStore
