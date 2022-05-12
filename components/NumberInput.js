

const NumberInput = ({mintQuantity, setMintQuantity, mintError, mintQuantityInputRef}) => {
    return (
        <div className='mb-4'>
            <div className='flex flex-row'>
                <button
                    className="border-2 hover:bg-yellow-200 text-black py-4 px-8 rounded-l"
                    onClick={() => setMintQuantity(mintQuantity-1)}
                >-</button>
                <input
                    className={ ! mintError ? "border-2 border-b-2 p-4 text-center focus:outline-none focus:border-yellow-500 bg-transparent w-full" : "bg-transparent border border-red-500 p-4 text-center focus:outline-none focus:border-yellow-500 w-full"}
                    onChange={ e => setMintQuantity(e.target.value)}
                    value={mintQuantity}
                    placeholder="1"
                    type="number"
                    min="1"
                    max="10"
                    ref={mintQuantityInputRef}
                />
                <button
                    className="border-2 border-l-0 hover:bg-yellow-200 text-black py-4 px-8 rounded-r"
                    onClick={() => setMintQuantity(mintQuantity+1)}
                >+</button>
            </div>
            <p>Max 10 per address</p>
        </div>
    )
}

export default NumberInput;