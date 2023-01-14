import Head from 'next/head'
import { useEffect, useState } from 'react';
import Title from '@components/Title';
import { Token, TokenValues } from '@appTypes/tokenTypes';

export default function Home() {
  const [ tokenValues, setTokenValues ] = useState<TokenValues>({} as TokenValues);
  const [ tokenList, setTokenList ] = useState<Token[]>([]);
  
  const [ stopSignal, setStopSignal ] = useState(true);
  const [ firstFetchStopSignal, setFirstFetchStopSignal ] = useState(false);

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
      let data: any = JSON.parse(o)

      const setDataAndStopSignal = () => {
        if (data.length > 1) {
          setTokenList(data);
          setFirstFetchStopSignal(true);
        }
      }
      if (o) {
        setDataAndStopSignal();
      }

      // RESPONSE WITH ALL CRYPTOS
      if (channel === 'GetInstruments' && !firstFetchStopSignal) {
        console.log(data, 'all');
      }

      // FIRST RESPONSE
      if (channel === 'SubscribeLevel1' && !firstFetchStopSignal) {
        console.log(data, 'first');
        setTokenValues(data);
      }

      // UPDATES TO SUBSCRIBELEVEL1
      if (channel === 'Level1UpdateEvent') {
        console.log(data, 'updates');
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
          {console.log('cryptoData', tokenList)}
        </>
      </main>
    </div>
  )
}
