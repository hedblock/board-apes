import Head from 'next/head'
import MintContainer from '../components/MintContainer'
import Image from 'next/image';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header/Header';

const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
  palette: {
    accent: {
      main: '#356FBB',
    },
    inactive: {
      main: "#e5e7eb"
    }
  }
});

import {
  Rinkeby,
  Mainnet,
  DAppProvider,
} from '@usedapp/core';
import { getDefaultProvider } from 'ethers';


const config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: getDefaultProvider(Rinkeby.chainId),
    [Mainnet.chainId]: getDefaultProvider(Mainnet.chainId),
  },
};

export default function Home() {

  return (
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <div className='relative min-h-screen'>
          <Image
            src='/background.png'
            layout='fill'
            className='-z-10'
            alt='page background'
            objectFit='cover'
            objectPosition='center'
          />
          <div className="w-full">
            <Head>
              <title>Board Apes</title>
              <meta name="description" content="Mint an NFT, or a number of NFTs, from the client-side." />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='w-full h-screen flex flex-col justify-center align-center'>
              <div className='relative flex flex-row justify-center align-center '>
                <MintContainer />
              </div>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </DAppProvider>
  )
}
