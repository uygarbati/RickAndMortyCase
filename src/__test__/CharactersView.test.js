import React from 'react'
import CharactersView from '../views/CharactersView'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<CharactersView />).toJSON();
  expect(tree).toMatchSnapshot();
});
