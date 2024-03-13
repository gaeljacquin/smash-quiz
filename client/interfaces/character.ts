export interface Character {
  smash_id: string,
  name: {
    en_us: string,
    fr_ca: string,
    fr_fr: string,
    es_la: string,
    es_es: string,
    [key: string]: string,
  },
  simple_name: string,
  filters: {
    universe?: Record<string, boolean>,
    gender?: Record<string, boolean>,
    games: Record<string, string>,
    tether?: boolean,
    echo_fighter?: boolean,
    gendered_alts?: boolean,
    pokemon?: boolean,
    extra_double_jumps?: boolean,
    [key: string]: unknown,
  },
  chara_0: string,
  chara_5: string,
}

export interface CharacterPlus extends Character {
  fullImg: string,
  partialImg: string,
  toggled: boolean,
}
