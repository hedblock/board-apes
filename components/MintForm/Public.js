import MintButton from './MintButton.js';

export default function Whitelist({mintNFTs}) {

    return (
        <div className="flex flex-col align-center">
            <h1 className="text-white font-bold text-xl text-center mb-2">Public Mint</h1>
            <p className="text-center text-gray-200 mb-4">During this phase, all addresses can mint a token.</p>
            <MintButton 
                onClick={() => mintNFTs(1)}
                text={`Mint`}
            />
        </div>
    )
}