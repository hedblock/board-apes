import MintForm from "./MintForm/MintForm";
import MintTimeline from "./MintTimeline";

export default function MintDetails({publicSaleActive, publicMintCounter, totalSupply}) {

    return (
        <div className="flex flex-col items-center justify-center px-16 py-8 w-full">
            <MintTimeline publicMintCounter={publicMintCounter} totalSupply={totalSupply}/>
            <MintForm publicSaleActive={publicSaleActive} />
        </div>
    )
}