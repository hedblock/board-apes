
import {useState, useRef} from 'react';

import Minter from '../../src/artifacts/contracts/Minter.sol/Minter.json';

import AffeMitWaffe from './AffeMitWaffe';
import Whitelist from './Whitelist';
import Public from './Public';

export default function MintForm({currentStage}) {

    const MINT_PRICE = 0.125;

    const mintQuantityInputRef = useRef()
    const [mintError, setMintError] = useState(false)
    const [mintMessage, setMintMessage] = useState('')
    const [mintLoading, setMintLoading] = useState(false);

    // Call smart contract to mint NFT(s) from current address
    async function mintNFTs(quantity) {
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
                const transaction = await contract.mint(quantity, { value: ethers.utils.parseEther((quantity * MINT_PRICE).toString()) })
                await transaction.wait()

                mintQuantityInputRef.current.value = 0
                setMintMessage(`Congrats, you minted a Board Ape!`)
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

    let phaseComponent;
    switch(currentStage) {
        case 0:
            phaseComponent = <AffeMitWaffe mintNFTs={mintNFTs} />
            break;
        case 1:
            phaseComponent = <Whitelist mintNFTs={mintNFTs} />
            break;
        case 2:
            phaseComponent = <Public mintNFTs={mintNFTs} />
            break;
        default:
            phaseComponent = <div>Error</div>
    }

    return (
        <div>
            {phaseComponent}
            { mintMessage && <span className={mintError ? "text-red-600 text-xs mt-2 block" : "text-green-600 text-xs mt-2 block"}>{ mintMessage }</span> }
        </div>
    )

}