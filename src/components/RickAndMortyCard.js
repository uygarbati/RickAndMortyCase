import React from 'react'
import './RickAndMortyCard.scss'

export default function RickAndMortyCard ({ id, name, thumbnail, handleClickFn }) {
  function handleCardClick () {
    if (handleClickFn) {
      handleClickFn(id)
    }
  }

  return (
    <div
      className="character-card"
      onClick={handleCardClick}
    >
      <img
        src={thumbnail}
        alt={name}
      />
      <div>
        <span>{name}</span>
      </div>
    </div>
  )
}
