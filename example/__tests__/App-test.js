import 'react-native'
import React from 'react'
import { setDarkModeMock } from '@busfor/react-native-navigation-appearance'
import AppScreen from '../src/AppScreen'

import renderer from 'react-test-renderer'

it('light theme', () => {
  setDarkModeMock(false)
  const tree = renderer.create(<AppScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('dark theme', () => {
  setDarkModeMock(true)
  const tree = renderer.create(<AppScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
