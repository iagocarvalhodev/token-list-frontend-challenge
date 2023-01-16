import { render } from '@testing-library/react'
import React from 'react'


import Home from '../../pages/index'

describe('The index page', () => {
  it('should wait for the grid to be displayed', () => {
    const { getByTestId, findByText } = render(<Home />)
    expect(getByTestId('grid')).toBeInTheDocument()
    expect(findByText('Foxbit - Frontend Challenge')).toBeTruthy()
  })
})
