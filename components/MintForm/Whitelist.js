import {useState, useEffect} from 'react';

import { ethers } from 'ethers';

import MintButton from './MintButton.js';

export default function Whitelist({mintNFTs}) {

    const [loading, setLoading] = useState(true);
    const [whitelistMintsAllowed, setWhitelistMintsAllowed] = useState(0);

    useEffect(() => {
        const getWhitelistAllowed = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            // const contract = new ethers.Contract(contractAddress, abi, signer);
            // await contract.balanceOf("0x8125ef62932875F3DFAb6C9b39Fa12C087397CB5", "1007496385244793107399748214575955941358093266602129796306953899048743993345");
            setWhitelistMintsAllowed(3);
            setLoading(false);
        }
        getWhitelistAllowed();
    });

    return (
        <div className="flex flex-col align-center">
            <h1 className="text-white font-bold text-xl text-center mb-2">Whitelist Mint</h1>
            <p className="text-center text-gray-200 mb-2">During this phase, whitelisted addresses can mint their allocated tokens.</p>
            <div className="flex flex-col items-center">
                <h2 className="text-white font-bold text-center mb-4">Your Whitelist Allocation: {whitelistMintsAllowed} Tokens</h2>
            </div>
            <MintButton 
                onClick={() => mintNFTs(whitelistMintsAllowed)}
                disabled={whitelistMintsAllowed === 0}
                text={`Mint x ${whitelistMintsAllowed}`}
            />
        </div>
    )
}