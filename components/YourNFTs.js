import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { hasEthereum, requestAccount } from '../utils/ethereum'
import Minter from '../src/artifacts/contracts/Minter.sol/Minter.json'
import Image from "next/image";

export default function YourNFTs() {
    // UI state
    const [nfts, setNfts] = useState([])

    useEffect( function() {
        getNftsOfCurrentWallet()
    });

    // Get NFTs owned by current wallet
    async function getNftsOfCurrentWallet() {
        if(!hasEthereum()) return

        try {
            // Fetch data from contract
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MINTER_ADDRESS, Minter.abi, provider)
            const address = await signer.getAddress()
            // Get the tokenIds owned by the current user
            const tokenIds = await contract.ownedTokensByAddress(address);
            setNfts(tokenIds)
          } catch(error) {
              console.log(error)
          }
    }

    return (
        <div>
            <h2 className="text-4xl font-semibold mb-16 text-center">Your NFTs</h2>
            <ul className="grid grid-cols-4 gap-6">
                { nfts.map( (nft) => (
                    <div key={nft} className="bg-white flex flex-col justify-center items-center text-2 shadow-xl hover:shadow-2xl rounded-xl">
                        <Image
                            height={1122}
                            width={1122}
                            src='/BoardApe.jpg'
                            className='rounded-t-lg'
                        />
                        <div className='p-4'>
                            Board Ape #{nft.toNumber()}
                        </div>
                    </div>))}
            </ul>
        </div>
    )
}