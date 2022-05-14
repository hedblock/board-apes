import { useEthers } from '@usedapp/core';

export default function Wallet() {
    // UI state

    const { activateBrowserWallet, account } = useEthers();

    return (
        <button
            className="bg-background hover:bg-gray-900 focus:bg-gray-200 rounded p-4 flex items-center text-xs disabled:cursor-not-allowed text-text"
            onClick={activateBrowserWallet}
            disabled={account}
        >
            <span className={ account ? "rounded-full h-2 w-2 block mr-2 bg-green" : "rounded-full h-2 w-2 block mr-2 bg-red" } />
            { account || "Connect your Wallet" }
        </button>
    )
}