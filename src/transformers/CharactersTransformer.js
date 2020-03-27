export class CharactersTransformer {
  static fetch (data) {
    return data.map(item => {
      return {
        id: item.id,
        name: item.name,
        thumbnail: item.image,
      }
    })
  }
}
