import { render, cleanup } from '@testing-library/react'
import React from 'react'


import { TokenCard } from '../components/tokenCard'

afterEach(() => {
  cleanup()
})

describe('The Card Token Component', () => {
  it('should wait for the token to be rendered and value rolling treatment ', () => {
    const token = [
      {
        OMSId: 1,
        InstrumentId: 1,
        Symbol: 'BTC/BRL',
        Product1: 1,
        Product1Symbol: 'BTC',
        Product2: 2,
        Product2Symbol: 'BRL',
        InstrumentType: 'Standard',
        VenueInstrumentId: 1,
        VenueId: 1,
        SortIndex: 0,
        SessionStatus: 'Running',
        PreviousSessionStatus: 'Paused',
        SessionStatusDateTime: '2020-07-11T01:27:02.851Z',
        SelfTradePrevention: true,
        QuantityIncrement: 1e-8,
        PriceIncrement: 0.01,
        MinimumQuantity: 1e-8,
        MinimumPrice: 0.01,
        VenueSymbol: 'BTC/BRL',
        IsDisable: false,
        MasterDataId: 0,
        PriceCollarThreshold: 0,
        PriceCollarPercent: 0,
        PriceCollarEnabled: false,
        PriceFloorLimit: 0,
        PriceFloorLimitEnabled: false,
        PriceCeilingLimit: 0,
        PriceCeilingLimitEnabled: false,
        CreateWithMarketRunning: true,
        AllowOnlyMarketMakerCounterParty: false
      }
    ]

    const tokenValue = {
      OMSId: 1,
      InstrumentId: 1,
      MarketId: 'btcbrl',
      BestBid: 110207.49,
      BestOffer: 109035.1128,
      LastTradedPx: 109921.333,
      LastTradedQty: 0.00009999,
      LastTradeTime: 1667479037,
      SessionOpen: 106033.6278,
      SessionHigh: 105987.6085,
      SessionLow: 104053.0201,
      SessionClose: 105726.9092,
      Volume: 0.00009999,
      CurrentDayVolume: 55.2345,
      CurrentDayNumTrades: 591,
      CurrentDayPxChange: 1722.1111,
      Rolling24HrVolume: 92.9297,
      Rolling24NumTrades: 1111,
      Rolling24HrPxChange: -0.4222,
      TimeStamp: 1878588048
    }

    const { getByText } = render(<TokenCard singleToken={token[0]} tokenValue={tokenValue} />)
    expect(getByText('BTC/BRL')).toBeInTheDocument()
    expect(getByText('0.4222%')).toBeInTheDocument()
  })
})
