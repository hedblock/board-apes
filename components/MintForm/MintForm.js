
import {useState} from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import AffeMitWaffe from './AffeMitWaffe';
import Public from './Public';

export default function MintForm({publicSaleActive}) {

    const [mintError, setMintError] = useState(false)
    const [mintMessage, setMintMessage] = useState('')
    const [mintLoading, setMintLoading] = useState(false);

    const [mintType, setMintType] = useState(publicSaleActive ? 'public': 'affe');

    const handleChange = (event, newType) => {
        setMintType(newType);
      };

    return (
        <div className='flex flex-col align-center'>
            <ToggleButtonGroup
                color="accent"
                value={mintType}
                exclusive
                onChange={handleChange}
                fullWidth
                className='mb-4'
            >
                <ToggleButton value="affe" style={{color: "#fff"}}>Affe</ToggleButton>
                <ToggleButton value="public" style={{color: "#fff"}}>Public</ToggleButton>
            </ToggleButtonGroup>
            {mintType === 'public' 
                ? <Public publicSaleActive={publicSaleActive} /> 
                : <AffeMitWaffe />
            }
            { mintMessage && <span className={mintError ? "text-red-600 text-xs mt-2 block" : "text-green-600 text-xs mt-2 block"}>{ mintMessage }</span> }
        </div>
    )

}