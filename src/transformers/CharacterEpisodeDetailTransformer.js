export class CharacterEpisodeDetailTransformer {
  static fetch (data) {
    if (Array.isArray(data)) {
      return data
        .map(item => item.name)
        .join(', ')
    }
    return data.name
  }
}
