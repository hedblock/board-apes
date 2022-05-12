import {useState} from 'react';

import MintForm from "./MintForm/MintForm";
import MintTimeline from "./MintTimeline";

export default function MintDetails() {

    const [currentStage, setCurrentStage] = useState(2);

    return (
        <div className="flex flex-col items-center px-16 py-8">
            <MintTimeline currentStage={currentStage} />
            <MintForm currentStage={currentStage} />
        </div>
    )
}