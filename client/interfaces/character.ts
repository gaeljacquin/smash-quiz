export interface Character {
  smash_id: string,
  simple_name: string,
  name_en_us: string,
  name_fr_ca?: string,
  name_fr_fr?: string,
  name_es_la?: string,
  name_es_es?: string,
  full_img: string,
  partial_img: string,
}

export interface CharacterPlus extends Character {
  toggled: boolean,
}

export interface CharacterItemProps {
  smashId: string
  answer?: boolean
}
