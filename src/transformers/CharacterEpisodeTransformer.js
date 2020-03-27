export class CharacterEpisodeTransformer {
  static fetch (data) {
    let convertData = []
    if (data.episode) {
      data.episode.slice(Math.max(data.episode.length - 5, 0)).forEach(item => {
        let epsidoId = []
        epsidoId = item.split(/[.,\/ -]/)
        convertData.push(epsidoId[epsidoId.length - 1])
      })
    }
    return convertData
  }
}
