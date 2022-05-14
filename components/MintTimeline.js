export default function MintTimeline({publicMintCounter, totalSupply}) {
    return (
        <div className='w-full mb-8'>
            <h1 className='text-text text-xl font-bold mb-4 text-center'>Mint Progress</h1>
            <div className='flex flex-row space-x-1 w-full'>
                <div style={{flexGrow: 1}} className='p-2 rounded-l-lg bg-accent2 shadow-xl'>
                    <p className="font-bold text-xl text-text">{(totalSupply && publicMintCounter) 
                        && totalSupply.sub(publicMintCounter).toString()}/500</p>
                    <p className='text-sm text-subtext'>Affe Mint</p>
                </div>
                <div style={{flexGrow: 2}} className='p-2 rounded-r-lg bg-accent1'>
                    <p className="font-bold text-text text-xl">{publicMintCounter && publicMintCounter.toString()}/1000</p>
                    <p className="text-subtext text-sm">Public Mint</p>
                </div>
            </div>
        </div>
    );
}
