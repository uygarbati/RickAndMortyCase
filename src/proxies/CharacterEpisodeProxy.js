import { BaseProxy } from './BaseProxy'

export class CharacterEpisodeProxy extends BaseProxy {
  constructor ({ episodesId, parameters = {} } = {}) {
    super({
      endpoint: `episode/${episodesId}`,
      parameters,
    })
  }
}
