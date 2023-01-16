import styled from 'styled-components'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { Token, TokenValues } from '@appTypes/tokenTypes'
import { useEffect, useState } from 'react'
import { priceFormat } from '../utils/utils'

interface TokenCardProps {
  singleToken: Token
  tokenValue: TokenValues
}

export const TokenCard = ({ singleToken, tokenValue }: TokenCardProps) => {
  const [variationPrice, setVariationPrice] = useState<boolean>(false)
  const [variationPricePorcent, setVariationPricePorcent] = useState<string>('---')
  const [lastPriceToken, setLastPriceToken] = useState<string>('---')
  const [tokenVolume, setTokenVolume] = useState<string>('---')
  const [tokenImage, setTokenImage] = useState<string>(singleToken.Product1Symbol.toLowerCase())

  useEffect(() => {
    if (singleToken.InstrumentId === tokenValue.InstrumentId) {
      setVariationPrice(Math.sign(tokenValue.Rolling24HrPxChange) === 1)
      setVariationPricePorcent(tokenValue.Rolling24HrPxChange.toString())
      setLastPriceToken(priceFormat.format(tokenValue.LastTradedPx).substring(2))
      setTokenVolume(priceFormat.format(tokenValue.Rolling24HrVolume).substring(3))
    }
  }, [tokenValue, singleToken])

  return (
    <Card>
      <div>
        <img
          onError={() => setTokenImage('default-currency')}
          src={`https://statics.foxbit.com.br/icons/colored/${tokenImage}.svg`}
          alt={singleToken.Product1Symbol}
        />
        <PriceChangeContent color={variationPrice ? '#ebfaf4' : '#fceded'}>
          {variationPrice ? <BsArrowUp color='#214739' size={10} /> : <BsArrowDown color='#5c3030' size={10} />}
          <VariantPrice color={variationPrice ? '#214739' : '#5c3030'}>
            {variationPrice ? <>{`${variationPricePorcent}%`}</> : <>{`${variationPricePorcent.substring(1)}%`}</>}
          </VariantPrice>
        </PriceChangeContent>
      </div>
      <div>
        <h3>{singleToken.Symbol}</h3>
        <h2>
          R$ <span>{lastPriceToken}</span>
        </h2>
      </div>
      <div>
        <small>Volume (24h):</small>
        <span>
          {tokenVolume} {singleToken.Product1Symbol}
        </span>
      </div>
    </Card>
  )
}

const { Card, PriceChangeContent, VariantPrice } = {
  Card: styled.div`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    max-height: 180px;
    padding: 24px 20px;
    border-radius: 16px;

    > div:nth-child(1) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 4px;

      img {
        width: 28px;
        height: 28px;
      }
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      > h3 {
        font-family: gilroymedium;
        font-size: 16px;
        font-weight: 500;
      }
      > h2 {
        font-size: 19px;
        color: #b7b8be;
        font-weight: 500;
        span {
          color: #1d1d21;
        }
      }
    }

    > div:nth-child(3) {
      display: flex;
      flex-direction: column;
      small {
        font-size: 10px;
      }
      span {
        font-size: 12px;
        text-transform: uppercase;
      }
    }
  `,
  PriceChangeContent: styled.div`
    min-width: 48px;
    background-color: ${props => props.color};
    border-radius: 12px;
    padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  VariantPrice: styled.span`
    color: ${props => props.color};
    font-size: 12px;
    font-weight: 500;
  `
}
