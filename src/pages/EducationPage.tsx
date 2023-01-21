import React from 'react';
import { List, Typography } from '@mui/material';
import { TimelineListItem } from 'components/TimelineListItem/TimelineListItem';
import { TimelineListItemSkeleton } from 'components/TimelineListItem/TimelineListItemSkeleton';
import { useEducation } from 'hooks/collections/useEducation';
import { useSortTimelineEntries } from 'hooks/useSortTimelineEntries';
import { ErrorView } from 'views/ErrorView';
import { PageWrapper } from './Page';
import { withHelmet } from 'components/Helmet';
import { SiteNavigation } from 'routing/SiteNavigation';

const EducationPageContent = () => {
    const { data, isError, isLoading } = useEducation();
    const sortedData = useSortTimelineEntries(data || []);

    return <>
        <Typography variant='h4' fontWeight='bold' textAlign='center'>My education</Typography>
        {isError && <ErrorView title='Ooops! Something went wrong' message='An error occurred while fetching data from server. Please try again in a while, if error remains please contact the administrator!' />}
        <List>
            {isLoading && Array(5).fill(1).map((el, i) => <TimelineListItemSkeleton key={i} />)}
            {sortedData.map((e, i) => <TimelineListItem key={e.fireId} {...e} />)}
        </List>
    </>;
};

export const EducationPage = withHelmet(SiteNavigation.education.name)(PageWrapper(EducationPageContent));
