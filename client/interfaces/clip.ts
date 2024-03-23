export interface Clip {
  id: number
  clip_name: string
  youtube_id: string
  link?: string
  timer: number
  fighters: string[]
}

export const blankClip: Clip = {
  id: 0,
  clip_name: '',
  youtube_id: '',
  link: '',
  timer: 0,
  fighters: [],
};
