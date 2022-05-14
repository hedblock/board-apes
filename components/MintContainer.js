import { Paper } from "@mui/material";
import { useEthers } from "@usedapp/core";
import CollectionDetails from "./CollectionDetails";
import MintDetails from "./MintDetails";

import { useCollectionDetails } from '../hooks/boardApesHooks';

export default function MintContainer() {

    const {account} = useEthers();
    const {mintPrice, maxSupply, totalSupply, publicSaleActive, publicMintCounter} = useCollectionDetails();

    return (
        <Paper className="flex flex-col md:flex-row z-10 bg-background rounded-2xl max-w-4xl align-center" elevation={24}>
            {account && 
                <CollectionDetails 
                    mintPrice={mintPrice}
                    maxSupply={maxSupply}
                    totalSupply={totalSupply}
                />}
            <MintDetails 
                publicSaleActive={publicSaleActive} 
                publicMintCounter={publicMintCounter}
                totalSupply={totalSupply}
            />
        </Paper>
    )
}