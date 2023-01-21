import React from 'react';
import { List, Stack, Typography, Zoom } from '@mui/material';
import { PageWrapper } from './Page';
import { TimelineListItem } from 'components/TimelineListItem/TimelineListItem';
import { TimelineListItemSkeleton } from 'components/TimelineListItem/TimelineListItemSkeleton';
import { ErrorView } from 'views/ErrorView';
import { useSortTimelineEntries } from 'hooks/useSortTimelineEntries';
import { useExperience } from 'hooks/collections/useExperience';
import { NumericChip } from 'components/NumericChip';
import { withHelmet } from 'components/Helmet';
import { SiteNavigation } from 'routing/SiteNavigation';

const ExperiencePageContent = () => {
    const { data, isLoading, isError } = useExperience();
    const sortedData = useSortTimelineEntries(data || []);

    return <><Typography variant='h4' fontWeight='bold' textAlign='center'>My proffesional experience</Typography>
        <Stack direction='row' justifyContent='center' alignItems={{ xs: 'flex-start', md: 'center' }} spacing={6} paddingTop={2}>
            <Zoom in={true}><NumericChip value={5} endAdornment='+' title='Years of experience' /></Zoom>
            <Zoom in={true}><NumericChip value={28} title='Years old' /></Zoom>
            <Zoom in={true}><NumericChip value={7} endAdornment='+' title={'Projects I\'ve worked on'} /></Zoom>
        </Stack>
        {isError && <ErrorView title='Ooops! Something went wrong' message='An error occurred while fetching data from server. Please try again in a while, if error remains please contact the administrator!' />}
        <List sx={{ paddingTop: 4 }}>
            {isLoading && Array(5).fill(1).map((el, i) => <TimelineListItemSkeleton key={i} />)}
            {sortedData.map((e, i) => <TimelineListItem key={e.fireId} {...e} />)}
        </List>
    </>;
};

export const ExperiencePage = withHelmet(SiteNavigation.experience.name)(PageWrapper(ExperiencePageContent));
