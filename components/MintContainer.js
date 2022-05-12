import { Paper } from "@mui/material";
import CollectionDetails from "./CollectionDetails";
import MintDetails from "./MintDetails";

export default function MintContainer() {

    return (
        <Paper className="flex flex-row z-10 bg-gray-800 rounded-2xl max-w-3xl" elevation={24}>
            <CollectionDetails />
            <MintDetails />
        </Paper>
    )
}