import {useRef, useState} from "react";
import {hasEthereum} from "../utils/ethereum";
import {ethers} from "ethers";
import Minter from "../src/artifacts/contracts/Minter.sol/Minter.json";
import Image from 'next/image';
import TotalSupply from "./TotalSupply";
import NumberInput from "./NumberInput";
import PriceCalculator from "./PriceCalculator";


export default function MintNFTs() {

    // Constants
    const MINT_PRICE = 0.125;
    const MAX_MINT = 10;

    const [mintQuantity, setMintQuantity] = useState(1)
    const mintQuantityInputRef = useRef()
    const [mintError, setMintError] = useState(false)
    const [mintMessage, setMintMessage] = useState('')
    const [mintLoading, setMintLoading] = useState(false);

    // Call smart contract to mint NFT(s) from current address
    async function mintNFTs() {
        // Check quantity
        if ( mintQuantity < 1 ) {
            setMintMessage('You need to mint at least 1 NFT.')
            setMintError(true)
            mintQuantityInputRef.current.focus()
            return
        }
        if ( mintQuantity > MAX_MINT ) {
            setMintMessage('You can only mint a maximum of 10 NFTs.')
            setMintError(true)
            mintQuantityInputRef.current.focus()
            return
        }

        // Get wallet details
        if(!hasEthereum()) return
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()

            try {
                const address = await signer.getAddress()

                setMintLoading(true);
                // Interact with contract
                const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MINTER_ADDRESS, Minter.abi, signer)
                const totalPrice = MINT_PRICE * mintQuantity
                const transaction = await contract.mint(mintQuantity, { value: ethers.utils.parseEther(totalPrice.toString()) })
                await transaction.wait()

                mintQuantityInputRef.current.value = 0
                setMintMessage(`Congrats, you minted ${mintQuantity} token(s)!`)
                setMintError(false)
            } catch {
                setMintMessage('Connect your wallet first.');
                setMintError(true)
            }
        } catch(error) {
            setMintMessage(error.message)
            setMintError(true)
        }
        setMintLoading(false)
    }


    return (
            <div className="flex flex-col space-y-16 lg:space-y-0 lg:flex-row  lg:space-x-8 justify-between">
                <div className='flex-1 flex flex-col justify-center items-center'>
                    <div className='shadow-2xl w-full max-w-lg rounded-lg'>
                        <Image
                            height={1122}
                            width={1122}
                            src='/BoardApe.jpg'
                            layout='responsive'
                            className='rounded-lg'
                        />
                    </div>
                </div>
                <div className='flex-1 flex flex-col justify-center items-center'>
                    <div className='flex-1 flex flex-col justify-center w-full max-w-lg shadow-2xl rounded-lg overflow-hidden p-8'>
                        <h1 className="text-4xl font-semibold mb-2">
                            Board Apes
                        </h1>
                        <TotalSupply />
                        <NumberInput
                            mintQuantity={mintQuantity}
                            setMintQuantity={setMintQuantity}
                            mintError={mintError}
                            mintQuantityInputRef={mintQuantityInputRef}
                        />
                        <PriceCalculator mintQuantity={mintQuantity} mintPrice={MINT_PRICE}/>
                        <button
                            className="bg-yellow-500 hover:bg-yellow-400 text-white py-4 px-8 w-full rounded-lg"
                            onClick={mintNFTs}
                        >
                            { mintLoading ? 'Loading...' : 'Mint' }
                        </button>
                        { mintMessage && <span className={mintError ? "text-red-600 text-xs mt-2 block" : "text-green-600 text-xs mt-2 block"}>{ mintMessage }</span> }
                    </div>
                </div>
            </div>
    )
}