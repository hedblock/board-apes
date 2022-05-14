import { useEthers } from "@usedapp/core";

export default function MintButton({onClick, disabled, text}) {

    const { account, activateBrowserWallet } = useEthers();

    const activeButton = "bg-accent2 hover:bg-blue-400"
    const inactiveButton = "bg-disabled disabled:cursor-not-allowed";

    const baseStyle = "text-text font-medium py-4 px-8 w-full rounded-lg "

    return (
        account
            ? <button
                className={baseStyle + (disabled ? inactiveButton : activeButton)}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
            : <button
                className={baseStyle + activeButton}
                onClick={activateBrowserWallet}
            >
                Connect Wallet
            </button>
    )
}