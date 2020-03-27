import { BaseProxy } from './BaseProxy'

export class CharacterDetailProxy extends BaseProxy {
  constructor ({ characterId, parameters = {} } = {}) {
    super({
      endpoint: `character/${characterId}`,
      parameters,
    })
  }
}
