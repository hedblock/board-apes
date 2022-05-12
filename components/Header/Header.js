import Wallet from "./Wallet";

export default function Header() {

    return (
        <div className="flex flex-row justify-between align-center absolute top-4 lg:top-8 w-full px-8">
            <h1 className="text-white font-bold text-4xl z-10">MonkeyverseDAO</h1>
            <Wallet />
        </div>
    )
}