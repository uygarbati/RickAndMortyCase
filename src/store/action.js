import {
  INCREMENT_LOADING,
  DECREMENT_LOADING,
  FETCH_CHARACTERS,
  INCREMENT_CHARACTERS_OFFSET,
  SET_CHARACTERS_TOTAL,
  FETCH_CHARACTERS_EPISODE,
} from './constants'
import { CharactersProxy } from '../proxies/CharactersProxy'
import { CharactersTransformer } from '../transformers/CharactersTransformer'
import { CharacterDetailProxy } from '../proxies/CharacterDetailProxy'
import { CharacterEpisodeProxy } from '../proxies/CharacterEpisodeProxy'
import { CharacterEpisodeTransformer } from '../transformers/CharacterEpisodeTransformer'
import { CharacterEpisodeDetailTransformer } from '../transformers/CharacterEpisodeDetailTransformer'

const request = {
  characters: null,
  characterDetail: null,
  episodeDetail: null,
}

export function incrementLoading () {
  return dispatch => {
    dispatch({ type: INCREMENT_LOADING })
  }
}

export function decrementLoading () {
  return dispatch => {
    dispatch({ type: DECREMENT_LOADING })
  }
}

export function fetchCharacters () {
  return (dispatch, getState) => {
    if (request.characters) {
      return request.characters
    }

    const {
      charactersOffset,
      charactersTotal,
    } = getState()

    if (charactersTotal && charactersOffset >= charactersTotal) return

    return new Promise((resolve, reject) => {
      dispatch(incrementLoading())
      request.characters = new CharactersProxy()
        .setParameter('page', charactersOffset)
        .all()

      request.characters
        .then(response => {
          const characterData = CharactersTransformer.fetch(response.results)

          if (!charactersTotal) {
            dispatch({
              type: SET_CHARACTERS_TOTAL,
              payload: response.info.count,
            })
          }

          dispatch({ type: INCREMENT_CHARACTERS_OFFSET })

          dispatch({
            type: FETCH_CHARACTERS,
            payload: characterData,
          })
          resolve(characterData)
        })
        .catch(reject)
        .finally(() => {
          request.characters = null
          dispatch(decrementLoading())
        })
    })
  }
}

export function fetchCharactersEpisode (characterId) {
  return (dispatch, getState) => {
    if (request.characterDetail) {
      return request.characterDetail
    }
    const { charactersEpisode } = getState()

    if (charactersEpisode[characterId]) return

    return new Promise((resolve, reject) => {
      dispatch(incrementLoading())

      request.characterDetail = new CharacterDetailProxy({ characterId })
        .all()

      request.characterDetail
        .then(response => {
          const episodeIds = CharacterEpisodeTransformer.fetch(response)
          dispatch(fetchCharactersEpisodeDetail(characterId, episodeIds))
        })
        .catch(reject)
        .finally(() => {
          request.characterDetail = null
          dispatch(decrementLoading())
        })
    })
  }
}

export function fetchCharactersEpisodeDetail (characterId, episodeIds) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(incrementLoading())
      request.episodeDetail = new CharacterEpisodeProxy({ episodesId: episodeIds.join(', ') })
        .all()

      request.episodeDetail
        .then(response => {
          const charactersEpisodeDetailData = {
            [characterId.toString()]: CharacterEpisodeDetailTransformer.fetch(response),
          }
          dispatch({
            type: FETCH_CHARACTERS_EPISODE,
            payload: charactersEpisodeDetailData,
          })
          resolve(charactersEpisodeDetailData)
        })
        .catch(reject)
        .finally(() => {
          request.episodeDetail = null
          dispatch(decrementLoading())
        })
    })
  }
}
