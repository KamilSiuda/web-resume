import React from 'react';
import { Grid, ListItem, Stack, useMediaQuery, useTheme } from '@mui/material';

type TimelineListItemBaseProps = {avatar?: React.ReactNode; dates?: React.ReactNode; header?: React.ReactNode; content?: React.ReactNode; tags?: React.ReactNode};
export const TimelineListItemBase: React.FC<TimelineListItemBaseProps> = (
    {
        avatar, dates, header, content, tags
    }
) => {
    const theme = useTheme();
    const idDownLg = useMediaQuery(theme.breakpoints.down('lg'));

    return <><ListItem sx={{ padding: { xs: 1, lg: 4 }, marginBottom: 4 }}>
        <Grid container spacing={{ sm: 4, md: 8 }}>
            <Grid item xs={12} lg={4} display='flex' justifyContent='center'>
                <Stack direction='column' justifyContent={{ xs: 'center', lg: 'flex-start' }} alignItems='center' textAlign={{ xs: 'center', lg: 'left' }}>
                    {avatar}
                    {idDownLg && header}
                    {dates}
                    {tags}
                </Stack>
            </Grid>
            <Grid item xs={12} lg={8}>
                <Stack direction='column' spacing={1} sx={{ paddingBottom: 2, width: '100%' }}>
                    {!idDownLg && header}
                    {content}
                </Stack>
            </Grid>
        </Grid>
    </ListItem>
    </>;
};
