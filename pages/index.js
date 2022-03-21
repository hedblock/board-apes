import Head from 'next/head'
import { useState, useRef } from 'react'
import { ethers } from 'ethers'
import { hasEthereum } from '../utils/ethereum'
import Minter from '../src/artifacts/contracts/Minter.sol/Minter.json'
import TotalSupply from '../components/TotalSupply'
import Wallet from '../components/Wallet'
import YourNFTs from '../components/YourNFTs'
import MintNFTs from "../components/MintNFTs";

export default function Home() {

  return (
    <div className="w-full pt-36 mx-auto px-16">
      <Head>
        <title>Board Apes</title>
        <meta name="description" content="Mint an NFT, or a number of NFTs, from the client-side." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wallet />
      <main className="space-y-8 w-full">
        { ! process.env.NEXT_PUBLIC_MINTER_ADDRESS ? (
            <p className="text-md">
              Please add a value to the <pre>NEXT_PUBLIC_MINTER_ADDRESS</pre> environment variable.
            </p>
        ) : (
          <>
            <MintNFTs />
          </>
        ) }
        <YourNFTs />
      </main>
    </div>
  )
}
