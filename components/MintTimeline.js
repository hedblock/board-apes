import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function MintTimeline({currentStage}) {

    const stages = [
        {stage: 'Affe mit Waffe Mint', tokenIds: '0-500'}, 
        {stage: 'Whitelist Mint', tokenIds: '500-1000'}, 
        {stage: 'Public Mint', tokenIds: '1000-2000'}
    ];

    return (
        <div>
            <Timeline>
                {
                    stages.map((stage, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent color="white">
                                {stage.tokenIds}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color={currentStage === index ? 'primary' : 'grey'} />
                                {index !== stages.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent color='white'>
                                {stage.stage}
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        </div>
    );
}
