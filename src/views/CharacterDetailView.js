import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchCharactersEpisode } from '../store/action'
import './CharacterDetailView.scss'

export default function CharacterDetailView () {
  const history = useHistory()
  const { characterId } = useParams()
  const dispatch = useDispatch()
  const {
    character = {},
    charactersEpisode,
  } = useSelector(state => {
    return {
      character: state.characters.find(item => item.id === parseInt(characterId)),
      charactersEpisode: state.charactersEpisode[characterId],
    }
  }, shallowEqual)

  useEffect(() => {
    if (character.name) {
      document.title = character.name
    } else {
      history.goBack()
    }

    if (!charactersEpisode) {
      dispatch(fetchCharactersEpisode(characterId))
    }
  }, [])

  function handleBackButtonClick () {
    history.goBack()
  }

  return (
    <div className="page-frame character-detail-view">
      <img
        className="character-img"
        src={character.thumbnail}
        alt={character.name}
      />

      <div className="character-info">
        <div>
          <label className="input-label">CHARACTER: </label>
          {character.name}
        </div>
      </div>

      <div>
        <label className="input-label">EPISODE: </label>
        {charactersEpisode &&
        <>
          {!charactersEpisode && <span>No Episode</span>}
          {charactersEpisode}
        </>
        }
      </div>

      <button
        type="button"
        className="ram-btn blue-btn"
        onClick={handleBackButtonClick}
      >
        BACK
      </button>
    </div>
  )
}
