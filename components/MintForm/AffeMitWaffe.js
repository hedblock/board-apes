import {useState, useEffect} from 'react';

import { ethers } from 'ethers';
import {contractAddress, abi} from '../../erc1155Info/opensea.js';
import { Paper } from '@mui/material';

import MintButton from './MintButton.js';

export default function AffeMitWaffe(mintNFTs) {

    const [loading, setLoading] = useState(true);
    const [ownedAffes, setOwnedAffes] = useState([]);
    const [selectedAffes, setSelectedAffes] = useState([]);

    useEffect(() => {
        const getOwnedAffes = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer);
            await contract.balanceOf("0x8125ef62932875F3DFAb6C9b39Fa12C087397CB5", "1007496385244793107399748214575955941358093266602129796306953899048743993345");
            setOwnedAffes([1, 5, 87]);
        }
        getOwnedAffes();
    });

    return (
        <div className="flex flex-col align-center">
            <h1 className="text-white font-bold text-xl text-center mb-2">Affe mit Waffe Mint</h1>
            <p className="text-center text-gray-200 mb-2">During this phase, Affe mit Waffe holders get to mint 2 Board Apes per owned Affe Mit Waffe.</p>
            {
                ownedAffes.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <h2 className="text-white font-bold text-center mb-4">Your Affes</h2>
                        <div className="flex flex-row mb-4 flex-wrap">
                        {
                            ownedAffes.map(ownedAffe => (
                                <Paper 
                                    key={ownedAffe.id} 
                                    className={"flex flex-col items-center justify-center h-12 w-12 mx-2 border border-gray-600" + (!selectedAffes.includes(ownedAffe) ? " bg-gray-800 hover:bg-gray-900" : " bg-gray-900 hover:bg-gray-800")}
                                    elevation={16}
                                    onClick={() => selectedAffes.includes(ownedAffe) 
                                        ? setSelectedAffes(selectedAffes.filter(selectedAffe => selectedAffe !== ownedAffe))
                                        : setSelectedAffes([...selectedAffes, ownedAffe])}
                                >
                                    <p className="text-white text-sm">{ownedAffe}</p>
                                </Paper>
                            ))
                        }
                        </div>
                    </div>
                ) : <p className="text-gray-300 text-sm text-center mb-2">You don't own any Affes yet.</p>
            }
            <MintButton 
                onClick={() => mintNFTs(ownedAffes.length * 2)}
                disabled={selectedAffes.length === 0}
                text={`Mint x ${selectedAffes.length * 2}`}
            />
        </div>
    )
}