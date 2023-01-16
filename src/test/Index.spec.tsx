import { render, screen, fireEvent } from '@testing-library/react'
import WS from 'jest-websocket-mock'
import React from 'react'
import Home from '../../pages/index'

let ws: WS
beforeEach(() => {
  ws = new WS('wss://api.foxbit.com.br/')
})
afterEach(() => {
  WS.clean()
})

describe('The index page', () => {
  it('should wait for the grid to be displayed', () => {
    const { getByTestId, findByText } = render(<Home />)
    expect(getByTestId('grid')).toBeInTheDocument()
    expect(findByText('Foxbit - Frontend Challenge')).toBeTruthy()
  })

  it('should connect to the WebSocket server', async () => {
    render(<Home />)
    expect(ws.connected).toBeTruthy()
  })
})
