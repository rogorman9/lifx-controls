import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { mockLightA } from '../../mocks/mockLights'
import ColorWheel from '../ColorWheel'

describe('<ColorWheel />', () => {
  const onColorChange = jest.fn()
  const component = render(<ColorWheel onColorChange={onColorChange} light={mockLightA} />)

  it('should render Pin in correct position', () => {
    const { style } = component.getByTestId('color-pin').props
    expect(style).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({ left: 538.2745492941698, top: 285.8079824485823 }),
        ]),
      ])
    )
  })
})
