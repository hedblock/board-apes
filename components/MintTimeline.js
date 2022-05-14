export default function MintTimeline({publicMintCounter, totalSupply}) {

    const progressStyle = "w-full rounded-sm px-2 py-1 ";
    const progressContainerStyle = "p-2 bg-backgroundHover "

    return (
        <div className='w-full mb-8'>
            <h1 className='text-text text-xl font-bold mb-4 text-center'>Mint Progress</h1>
            <div className='flex flex-row w-full'>
                <div style={{flexGrow: 1}} className={progressContainerStyle + "rounded-l-lg"}>
                    <div className={progressStyle + "bg-accent2"}>
                        <p className="font-bold text-xl text-text">{(totalSupply && publicMintCounter) 
                            && totalSupply.sub(publicMintCounter).toString()}/500</p>
                    </div>
                    <p className='text-sm text-subtext'>Affe Mint</p>
                </div>
                <div style={{flexGrow: 2}} className={progressContainerStyle + "rounded-r-lg"}>
                    <div className={progressStyle + "bg-accent1"}>
                        <p className="font-bold text-text text-xl">{publicMintCounter && publicMintCounter.toString()}/1000</p>
                    </div>
                    <p className="text-subtext text-sm">Public Mint</p>
                </div>
            </div>
        </div>
    );
}
