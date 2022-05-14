import {useState} from 'react';
import Slider from '@mui/material/Slider';

import MintButton from './MintButton.js';
import { usePublicMint } from '../../hooks/boardApesHooks.js';

export default function PublicSale({publicSaleActive}) {

    const [mintQuantity, setMintQuantity] = useState(1);

    const activeStyle = 'text-green text-xs text-center mb-2';
    const inactiveStyle = 'text-red text-xs text-center mb-2';

    const mint = usePublicMint();

    return (
        <div className="flex flex-col align-center">
            <h1 className="text-text font-bold text-xl text-center mb-1">Public Mint</h1>
            <p className={publicSaleActive ? activeStyle : inactiveStyle}>{publicSaleActive ? "Active" : "Inactive"}</p>
            <p className="text-center text-subtext mb-4">During this phase, all addresses can mint a token.</p>
            <Slider
                value={mintQuantity}
                onChange={(event, newValue) => setMintQuantity(newValue)}
                defaultValue={1}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
            />
            <div className='mb-4'>
                <p className='text-center text-text font-medium'>Mint Quantity: {mintQuantity}</p>
            </div>
            <MintButton 
                onClick={() => mint(mintQuantity)}
                text={`Mint`}
                disabled={!publicSaleActive}
            />
        </div>
    )
}