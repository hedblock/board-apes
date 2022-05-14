import { useEthers } from "@usedapp/core";
import CollectionDetails from "./CollectionDetails";
import MintDetails from "./MintDetails";

import { useCollectionDetails } from '../hooks/boardApesHooks';

export default function MintContainer() {

    const {account} = useEthers();
    const {mintPrice, maxSupply, totalSupply, publicSaleActive, publicMintCounter} = useCollectionDetails();

    return (
        <div className="flex flex-col md:flex-row z-10 bg-background rounded-2xl max-w-4xl align-center">
            <CollectionDetails 
                mintPrice={mintPrice}
                maxSupply={maxSupply}
                totalSupply={totalSupply}
            />
            <MintDetails 
                publicSaleActive={publicSaleActive} 
                publicMintCounter={publicMintCounter}
                totalSupply={totalSupply}
            />
        </div>
    )
}