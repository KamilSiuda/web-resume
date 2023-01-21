import { FirestoreDocument } from 'models/storage/FirestoreDocument';
import { TimelineEntry } from 'models/TimelineEntry';
import { useMemo } from 'react';

export const useSortTimelineEntries = (timelineEntries: Array<TimelineEntry & FirestoreDocument>) => {
    const sortedEntries = useMemo(() => {
        return [...timelineEntries].sort((e1, e2) => e2.to ? e2.to.diff(e1.to) : 1);
    }, [timelineEntries]);

    return sortedEntries;
};
