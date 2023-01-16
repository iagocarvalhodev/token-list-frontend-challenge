export interface Token {
  AllowOnlyMarketMakerCounterParty: boolean
  CreateWithMarketRunning: boolean
  InstrumentId: number
  InstrumentType: string
  IsDisable: boolean
  MasterDataId: number
  MinimumPrice: number
  MinimumQuantity: number
  OMSId: number
  PreviousSessionStatus: string
  PriceCeilingLimit: number
  PriceCeilingLimitEnabled: boolean
  PriceCollarEnabled: boolean
  PriceCollarPercent: number
  PriceCollarThreshold: number
  PriceFloorLimit: number
  PriceFloorLimitEnabled: boolean
  PriceIncrement: number
  Product1: number
  Product1Symbol: string
  Product2: number
  Product2Symbol: string
  QuantityIncrement: number
  SelfTradePrevention: boolean
  SessionStatus: string
  SessionStatusDateTime: string
  SortIndex: number
  Symbol: string
  VenueId: number
  VenueInstrumentId: number
  VenueSymbol: string
}

export interface TokenValues {
  BestBid: number
  BestOffer: number
  CurrentDayNumTrades: number
  CurrentDayPxChange: number
  CurrentDayVolume: number
  InstrumentId: number
  LastTradeTime: number
  LastTradedPx: number
  LastTradedQty: number
  MarketId: string
  OMSId: number
  Rolling24HrPxChange: number
  Rolling24HrVolume: number
  Rolling24NumTrades: number
  SessionClose: number
  SessionHigh: number
  SessionLow: number
  SessionOpen: number
  TimeStamp: number
  Volume: number
}
