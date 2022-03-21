

const PriceCalculator = ({mintQuantity, mintPrice}) => {

    const statContainer = 'flex-1 p-4';
    const statData = ''

    return (
        <div className='flex flex-row w-full border-2 rounded-xl mb-4'>
            <div className={statContainer}>
                <p className='text-xl font-bold'>{mintQuantity} x 0.125 ETH</p>
                <p>Excluding Gas Fees</p>
            </div>
            <div className={statContainer}>
                <p className='text-xl font-bold text-yellow-500'>{mintQuantity * mintPrice} ETH</p>
                <p>Price</p>
            </div>
        </div>
    )
}

export default PriceCalculator;