import {useState} from 'react';

import { Paper } from '@mui/material';

import MintButton from './MintButton.js';
import { useOwnedAffen } from '../../hooks/boardApesHooks.js';

export default function AffeMitWaffe(mintNFTs) {

    const [selectedAffes, setSelectedAffes] = useState([]);

    const ownedAffes = useOwnedAffen();

    return (
        <div className="flex flex-col align-center">
            <h1 className="text-text font-bold text-xl text-center mb-2">Affe mit Waffe Mint</h1>
            <p className="text-center text-subtext mb-2">During this phase, Affe mit Waffe holders get to mint 2 Board Apes per owned Affe.</p>
            {
                ownedAffes.length > 0 ? (
                    <div className="flex flex-col items-center mb-4">
                        <h2 className="text-text font-bold text-center mb-4">Your Affen</h2>
                        <div className="flex flex-row flex-wrap">
                        {
                            ownedAffes.map(ownedAffe => (
                                <Paper 
                                    key={ownedAffe.id} 
                                    className={"flex flex-col items-center justify-center h-12 w-12 mx-2 border border-gray-600 bg-accent2" + (!selectedAffes.includes(ownedAffe) ? "  opacity-70 hover:opacity-100 " : " hover:opacity-70")}
                                    elevation={16}
                                    onClick={() => selectedAffes.includes(ownedAffe) 
                                        ? setSelectedAffes(selectedAffes.filter(selectedAffe => selectedAffe !== ownedAffe))
                                        : setSelectedAffes([...selectedAffes, ownedAffe])}
                                >
                                    <p className={"text-text text-sm " + (selectedAffes.includes(ownedAffe) && "font-bold")}>{ownedAffe}</p>
                                </Paper>
                            ))
                        }
                        </div>
                    </div>
                ) : <p className="text-subtext text-sm text-center mb-4">{"You don't own any Affen."}</p>
            }
            <MintButton 
                onClick={() => mintNFTs(ownedAffes.length * 2)}
                disabled={selectedAffes.length === 0}
                text={`Mint x ${selectedAffes.length * 2}`}
            />
        </div>
    )
}