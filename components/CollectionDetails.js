
import Image from 'next/image';

export default function CollectionDetails() {

    // Constants
    const MINT_PRICE = 0.125;
    const TOTAL_SUPPLY = 1000;

    const title = 'text-white text-xl font-bold mb-4 text-center';
    const description = 'text-gray-400 text-md font-medium';
    const value = 'text-white text-lg font-bold mb-2';

    return (
        <div className="flex flex-col items-center px-16 py-8">
            <div className='mb-2'>
                <Image
                    height={150}
                    width={150}
                    src='/boardApe.png'
                    layout='fixed'
                    className='rounded-full'
                />
            </div>
            <h2 className={title}>Board Apes Mint</h2>
            <h3 className={description}>Mint Price:</h3>
            <p className={value}>{MINT_PRICE}Ξ</p>
            <h3 className={description}>Total Supply:</h3>
            <p className={value}>{TOTAL_SUPPLY}</p>
            <h3 className={description}>Remaining Supply:</h3>
            <p className={value + 'mb-0'}>100</p>
        </div>
    )
}