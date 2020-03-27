import React from 'react'
import RickAndMortyCard from '../components/RickAndMortyCard'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<RickAndMortyCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
