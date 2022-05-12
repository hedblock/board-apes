
export default function MintButton({onClick, disabled, text}) {

    const activeButton = "bg-blue-500 hover:bg-blue-400 text-white py-4 px-8 w-full rounded-lg"
    const inactiveButton = "bg-gray-500 text-white py-4 px-8 w-full rounded-lg disabled:cursor-not-allowed"

    return (
        <button
            className={disabled ? inactiveButton : activeButton}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}