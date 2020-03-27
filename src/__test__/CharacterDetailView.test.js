import React from 'react'
import CharacterDetailView from '../views/CharacterDetailView'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<CharacterDetailView />).toJSON();
  expect(tree).toMatchSnapshot();
});
