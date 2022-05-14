import {useCall, useContractFunction, Mainnet} from '@usedapp/core';
import { Contract, utils } from 'ethers';

import {contractAddress, abi} from '../data/opensea';
import {affen} from '../data/affen';

import BoardApes from '../src/artifacts/contracts/BoardApes.sol/BoardApes.json';

export function useValue(name){
    const { value, error } = useCall({
        contract: new Contract(process.env.NEXT_PUBLIC_MINTER_ADDRESS, BoardApes.abi),
        method: name,
    }) ?? {}
    if(error) {
        console.error(error.message)
        return undefined
    }
    return value?.[0];
}

export function useCollectionDetails(){
    const mintPrice = useValue('price');
    const maxSupply = useValue('maxSupply');
    const totalSupply = useValue('totalSupply');
    const publicSaleActive = useValue('isPublicSaleActive');
    const publicMintCounter = useValue('publicMintCounter');
    return {mintPrice, maxSupply, totalSupply, publicSaleActive, publicMintCounter};
}

export function useOwnedAffen(){
    // const {account} = useEthers();
    const account = "0x8125ef62932875F3DFAb6C9b39Fa12C087397CB5";
    const { value, error } = useCall({
        contract: new Contract(contractAddress, abi),
        method: 'balanceOfBatch',
        chainId: Mainnet.chainId,
        args: [Array(affen.length).fill(account), affen],
    }) ?? {}
    if(error) {
        console.error(error.message)
        return []
    }
    return value?.[0].map((v, index) => !v.isZero() ? index + 1 : 0).filter(v => v > 0) ?? [];
}

export function usePublicMint(){
    const contract = new Contract(process.env.NEXT_PUBLIC_MINTER_ADDRESS, BoardApes.abi);
    const { state, send } = useContractFunction(contract, 'mint', {})
    return (quantity) => send(quantity, { value: utils.parseEther((quantity * 0.08).toString()) });
}

export function useAffenMint(){
    const contract = new Contract(process.env.NEXT_PUBLIC_MINTER_ADDRESS, BoardApes.abi);
    const { state, send } = useContractFunction(contract, 'affenMint', {})
    return (tokenIds) => send(tokenIds);
}