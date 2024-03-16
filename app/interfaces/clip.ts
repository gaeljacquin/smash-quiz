export interface Clip {
  id: number
  youtube_id: string
  link?: string
  timer: number
  fighters: string[]
}

export const blankClip: Clip = {
  id: 0,
  youtube_id: '',
  link: '',
  timer: 0,
  fighters: [],
};
