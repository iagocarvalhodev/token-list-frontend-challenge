import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Token, TokenValues } from '@appTypes/tokenTypes';
import { TokenCard } from '@components/tokenCard';
import { TokensGrid } from '@styles/components/tokensGrid';
import Title from '@styles/components/Title';

export default function Home() {
  const [ tokenValues, setTokenValues ] = useState<TokenValues>({} as TokenValues);
  const [ tokenList, setTokenList ] = useState<Token[]>([]);
  
  const [ stopSignal, setStopSignal ] = useState(true);
  const [ rotateStop, setRotateStop ] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('wss://api.foxbit.com.br/');

    ws.addEventListener('open', function open() {
      console.log('connected');

      const payloadInstruments = {
        m:0,
        i:2,
        n: 'GetInstruments',
        o: JSON.stringify({ OMSID: 1}),
      };

      ws.send(JSON.stringify(payloadInstruments));

      if (tokenList.length > 1 && stopSignal) {
        tokenList.map((token) => {
          const variablePayload = {
            m: 0,
            i: 2,
            n: 'SubscribeLevel1',
            o: JSON.stringify({ InstrumentId: token.InstrumentId || 1}),
          }
  
          ws.send(JSON.stringify(variablePayload));
        })
        setStopSignal(false)
      }
    });

    ws.addEventListener('close', function close() {
      console.log('disconnected');
    });

    ws.addEventListener('message', function message(response) {
      const { n, o } = JSON.parse(response.data);
      const channel = n;
       let data: any = []

      const setToken = () => {
        data = JSON.parse(o);
        if (data.length > 1) {
          setTokenList(data);
          setRotateStop(true);
        }
      }
      if (o) {
        setToken();
      }

      if (channel === 'SubscribeLevel1' && !rotateStop) {
        setTokenValues(data);
      }

      if (channel === 'Level1UpdateEvent') {
        setTokenValues(data);
      }
    });
  }, [tokenList]);

  return (
    <div>
      <Head>
        <title>Foxbit - Frontend Challenge</title>
        <meta name="description" content="Foxbit frontend challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title>Foxbit - Frontend Challenge</Title>
        <>
          <TokensGrid>
            {tokenList && tokenList.map(token => (
               <TokenCard singleToken={token} tokenValue={tokenValues} key={token.InstrumentId} />
            ))}
          </TokensGrid>
        </>
      </main>
    </div>
  )
}
