
import Image from 'next/image';

import { utils } from 'ethers';

export default function CollectionDetails({mintPrice, maxSupply, totalSupply}) {

    // Constants
    const title = 'text-text text-xl font-bold mb-4 text-center whitespace-nowrap';
    const description = 'text-subtext text-md font-medium';
    const value = 'text-text text-lg font-bold mb-2';

    return (
        <div className="flex flex-col items-center justify-center px-16 py-8">
            <div className='mb-2'>
                <Image
                    height={150}
                    width={150}
                    src='/boardApe.png'
                    layout='fixed'
                    className='rounded-full'
                    alt="Board Ape"
                />
            </div>
            <h2 className={title}>Board Apes Mint</h2>
            <h3 className={description}>Mint Price:</h3>
            <p className={value}>{mintPrice && utils.formatEther(mintPrice.toString())}Ξ</p>
            <h3 className={description}>Total Supply:</h3>
            <p className={value}>{maxSupply && maxSupply.toString()}</p>
            <h3 className={description}>Remaining Supply:</h3>
            <p className={value + 'mb-0'}>{(maxSupply && totalSupply) 
                && maxSupply.sub(totalSupply).toString()}</p>
        </div>
    )
}